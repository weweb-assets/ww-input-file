import { ref, onBeforeUnmount } from 'vue';
import anime from 'animejs/lib/anime.es.js';

/**
 * Simple debounce function to prevent rapid event firing
 */
function debounce(func, wait = 5) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

/**
 * Composable that handles the drag and drop animation with bubble-like movement and magnetic effects
 * @param {Object} options - Animation options
 * @param {Object} options.dropzoneRef - Ref to the dropzone element
 * @param {Object} options.circleRef - Ref to the circle element
 * @param {Boolean} options.isDisabled - Whether the component is disabled
 * @param {Boolean} options.isReadonly - Whether the component is readonly
 * @param {Boolean} options.dropEnabled - Whether drag and drop is enabled
 * @param {Number|String} options.circleOpacity - Opacity of the circle
 * @param {Number} options.animationSpeed - Speed multiplier for animations (lower = slower)
 * @returns {Object} - Animation state and handler functions
 */
export function useDragAnimation({
    dropzoneRef,
    circleRef,
    isDisabled,
    isReadonly,
    dropEnabled,
    circleOpacity,
    animationSpeed = 0.5, // Default to half speed
}) {
    // Animation state
    const isDragging = ref(false);
    const mouseX = ref(0);
    const mouseY = ref(0);
    const targetX = ref(0);
    const targetY = ref(0);
    const isAnimating = ref(false);
    let animationFrameId = null;
    let lastMoveTime = 0;

    /**
     * Starts the animation loop with spring physics for bubble-like movement
     */
    const startAnimationLoop = () => {
        if (isAnimating.value) return;

        isAnimating.value = true;

        // Spring physics parameters - adjusted for smoother movement
        // Apply animation speed to physics parameters
        const baseSpringStrength = 0.08; // Reduced from 0.15 for gentler pull
        const baseDamping = 0.85; // Increased from 0.65 for more fluid motion

        // Adjust spring strength based on animation speed (slower = smaller spring strength)
        const springStrength = baseSpringStrength * animationSpeed.value;
        // Adjust damping based on animation speed (slower = higher damping)
        const damping = baseDamping + (1 - animationSpeed.value) * 0.1;

        let velocityX = 0;
        let velocityY = 0;

        const updatePosition = () => {
            if (!isDragging.value) {
                isAnimating.value = false;
                return;
            }

            // Calculate spring force
            const dx = targetX.value - mouseX.value;
            const dy = targetY.value - mouseY.value;

            // Apply spring physics
            velocityX = velocityX * damping + dx * springStrength;
            velocityY = velocityY * damping + dy * springStrength;

            // Update position
            mouseX.value += velocityX;
            mouseY.value += velocityY;

            // Continue animation loop
            animationFrameId = requestAnimationFrame(updatePosition);
        };

        // Start the animation loop
        animationFrameId = requestAnimationFrame(updatePosition);
    };

    /**
     * Handles the dragover event to determine entry direction and start animation
     * @param {Event} event - The drag event
     */
    const handleDragOver = event => {
        if (isDisabled.value || isReadonly.value || !dropEnabled.value) return;

        // Rate limiting for smoother handling
        const now = Date.now();
        if (now - lastMoveTime < 16) return; // Cap at ~60fps
        lastMoveTime = now;

        // Prevent event bubbling issues
        event.stopPropagation();

        // Update target position on every drag over - ensure cursor is in center
        if (dropzoneRef.value) {
            const rect = dropzoneRef.value.getBoundingClientRect();
            targetX.value = event.clientX - rect.left;
            targetY.value = event.clientY - rect.top;
        }

        // Initialize animation on first drag over
        if (!isDragging.value) {
            isDragging.value = true;

            // Set initial position off-screen based on which side the cursor entered from
            if (dropzoneRef.value) {
                const rect = dropzoneRef.value.getBoundingClientRect();
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                // Calculate entry point distance from center
                const distToLeftEdge = targetX.value;
                const distToRightEdge = rect.width - targetX.value;
                const distToTopEdge = targetY.value;
                const distToBottomEdge = rect.height - targetY.value;

                // Find the closest edge
                const minDist = Math.min(distToLeftEdge, distToRightEdge, distToTopEdge, distToBottomEdge);

                // Position the circle just off the closest edge
                if (minDist === distToLeftEdge) {
                    // Left edge entry
                    mouseX.value = -100;
                    mouseY.value = targetY.value;
                } else if (minDist === distToRightEdge) {
                    // Right edge entry
                    mouseX.value = rect.width + 100;
                    mouseY.value = targetY.value;
                } else if (minDist === distToTopEdge) {
                    // Top edge entry
                    mouseX.value = targetX.value;
                    mouseY.value = -100;
                } else {
                    // Bottom edge entry
                    mouseX.value = targetX.value;
                    mouseY.value = rect.height + 100;
                }

                // Start the animation loop for smooth following
                startAnimationLoop();
            }
        }
    };

    /**
     * Handles the dragleave event to stop animation and cleanup
     */
    const handleDragLeave = event => {
        // Prevent false triggers from child elements
        if (dropzoneRef.value && dropzoneRef.value.contains(event.relatedTarget)) {
            return;
        }

        isDragging.value = false;
        isAnimating.value = false;

        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
            animationFrameId = null;
        }
    };

    /**
     * Handles the drop event with final position snapping and expansion animation
     * @param {Event} event - The drop event
     * @returns {Boolean} - Whether drop was handled successfully
     */
    const handleDrop = event => {
        if (isDisabled.value || isReadonly.value || !dropEnabled.value) return false;

        // Get final position for drop animation
        if (dropzoneRef.value) {
            const rect = dropzoneRef.value.getBoundingClientRect();
            targetX.value = event.clientX - rect.left;
            targetY.value = event.clientY - rect.top;
        }

        // Create drop animation with expansion
        if (circleRef.value) {
            // Stop the animation loop
            isAnimating.value = false;
            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId);
                animationFrameId = null;
            }

            // Adjust durations based on animation speed
            const baseDuration1 = 200;
            const baseDuration2 = 600;
            const duration1 = baseDuration1 / animationSpeed.value;
            const duration2 = baseDuration2 / animationSpeed.value;

            // Final snap to position with expansion animation
            anime
                .timeline({
                    easing: 'easeOutExpo',
                    complete: function () {
                        isDragging.value = false;
                    },
                })
                .add({
                    targets: circleRef.value,
                    translateX: [{ value: targetX.value - mouseX.value, duration: duration1 }],
                    translateY: [{ value: targetY.value - mouseY.value, duration: duration1 }],
                    scale: [1, 1.5],
                    opacity: [circleOpacity.value, 0.9],
                    duration: duration1,
                    easing: 'easeInCubic',
                })
                .add({
                    targets: circleRef.value,
                    scale: [1.5, 30],
                    opacity: [0.9, 0],
                    duration: duration2,
                    easing: 'easeOutQuart',
                });
        } else {
            isDragging.value = false;
        }

        return true;
    };

    // Debounce the mousemove handler to prevent flickering
    const handleMouseMove = debounce(event => {
        if (!isDragging.value) return;

        // Update target position
        if (dropzoneRef.value) {
            const rect = dropzoneRef.value.getBoundingClientRect();
            targetX.value = event.clientX - rect.left;
            targetY.value = event.clientY - rect.top;
        }
    }, Math.max(5, 16 / animationSpeed.value)); // Adjust debounce time based on animation speed

    // Clean up animation frame when component is unmounted
    onBeforeUnmount(() => {
        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
            animationFrameId = null;
        }
    });

    return {
        // State
        isDragging,
        mouseX,
        mouseY,
        targetX,
        targetY,
        isAnimating,

        // Event handlers
        handleDragOver,
        handleDragLeave,
        handleDrop,
        handleMouseMove,
    };
}
