import { ref, onBeforeUnmount } from 'vue';
import anime from 'animejs/lib/anime.es.js';

function debounce(func, wait = 5) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

export function useDragAnimation({
    dropzoneRef,
    circleRef,
    isDisabled,
    isReadonly,
    dropEnabled,
    circleOpacity,
    animationSpeed = 0.5,
}) {
    const isDragging = ref(false);
    const mouseX = ref(0);
    const mouseY = ref(0);
    const targetX = ref(0);
    const targetY = ref(0);
    const isAnimating = ref(false);
    let animationFrameId = null;
    let lastMoveTime = 0;

    const startAnimationLoop = () => {
        if (isAnimating.value) return;

        isAnimating.value = true;

        const baseSpringStrength = 0.12;
        const baseDamping = 0.82;
        const springStrength = baseSpringStrength * animationSpeed.value;
        const damping = baseDamping + (1 - animationSpeed.value) * 0.1;

        let velocityX = 0;
        let velocityY = 0;
        let prevTargetX = targetX.value;
        let prevTargetY = targetY.value;

        const updatePosition = () => {
            if (!isDragging.value) {
                isAnimating.value = false;
                return;
            }

            prevTargetX = prevTargetX + (targetX.value - prevTargetX) * 0.3;
            prevTargetY = prevTargetY + (targetY.value - prevTargetY) * 0.3;

            const dx = prevTargetX - mouseX.value;
            const dy = prevTargetY - mouseY.value;

            velocityX = velocityX * damping + dx * springStrength;
            velocityY = velocityY * damping + dy * springStrength;

            mouseX.value += velocityX;
            mouseY.value += velocityY;

            animationFrameId = requestAnimationFrame(updatePosition);
        };

        animationFrameId = requestAnimationFrame(updatePosition);
    };

    const handleDragOver = event => {
        if (isDisabled.value || isReadonly.value || !dropEnabled.value) return;

        const now = Date.now();
        if (now - lastMoveTime < 16) return; // Cap at ~60fps
        lastMoveTime = now;

        event.stopPropagation();

        if (dropzoneRef.value) {
            const rect = dropzoneRef.value.getBoundingClientRect();
            targetX.value = event.clientX - rect.left;
            targetY.value = event.clientY - rect.top;
        }

        if (!isDragging.value) {
            isDragging.value = true;

            if (dropzoneRef.value) {
                const rect = dropzoneRef.value.getBoundingClientRect();

                const distToLeftEdge = targetX.value;
                const distToRightEdge = rect.width - targetX.value;
                const distToTopEdge = targetY.value;
                const distToBottomEdge = rect.height - targetY.value;

                const minDist = Math.min(distToLeftEdge, distToRightEdge, distToTopEdge, distToBottomEdge);
                const entryOffset = 120;

                if (minDist === distToLeftEdge) {
                    mouseX.value = -entryOffset;
                    mouseY.value = targetY.value;
                } else if (minDist === distToRightEdge) {
                    mouseX.value = rect.width + entryOffset;
                    mouseY.value = targetY.value;
                } else if (minDist === distToTopEdge) {
                    mouseX.value = targetX.value;
                    mouseY.value = -entryOffset;
                } else {
                    mouseX.value = targetX.value;
                    mouseY.value = rect.height + entryOffset;
                }

                if (circleRef.value) {
                    anime({
                        targets: circleRef.value,
                        opacity: [0, circleOpacity.value],
                        scale: [0.4, 1],
                        duration: 300 / animationSpeed.value,
                        easing: 'easeOutCubic',
                    });
                }

                startAnimationLoop();
            }
        }
    };

    const handleDragLeave = event => {
        // Prevent false triggers from child elements
        if (dropzoneRef.value && dropzoneRef.value.contains(event.relatedTarget)) {
            return;
        }

        if (circleRef.value && isDragging.value) {
            anime({
                targets: circleRef.value,
                opacity: [circleOpacity.value, 0],
                scale: [1, 0.4],
                duration: 200 / animationSpeed.value,
                easing: 'easeOutQuad',
                complete: () => {
                    isDragging.value = false;
                    isAnimating.value = false;
                },
            });
        } else {
            isDragging.value = false;
            isAnimating.value = false;
        }

        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
            animationFrameId = null;
        }
    };

    const handleDrop = event => {
        if (isDisabled.value || isReadonly.value || !dropEnabled.value) return false;

        if (dropzoneRef.value) {
            const rect = dropzoneRef.value.getBoundingClientRect();

            mouseX.value = event.clientX - rect.left;
            mouseY.value = event.clientY - rect.top;
            targetX.value = mouseX.value;
            targetY.value = mouseY.value;
        }

        if (circleRef.value) {
            isAnimating.value = false;
            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId);
                animationFrameId = null;
            }

            // Simple, reliable animation with fixed duration
            anime({
                targets: circleRef.value,
                scale: [1, 35],
                opacity: [circleOpacity.value, 0],
                duration: 800,
                easing: 'easeOutQuad',
                complete: function () {
                    isDragging.value = false;
                },
            });
        } else {
            isDragging.value = false;
        }

        return true;
    };

    const handleMouseMove = debounce(event => {
        if (!isDragging.value) return;

        if (dropzoneRef.value) {
            const rect = dropzoneRef.value.getBoundingClientRect();
            targetX.value = event.clientX - rect.left;
            targetY.value = event.clientY - rect.top;
        }
    }, Math.max(5, 16 / animationSpeed.value)); // Adjust debounce time based on animation speed

    onBeforeUnmount(() => {
        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
            animationFrameId = null;
        }
    });

    return {
        isDragging,
        mouseX,
        mouseY,
        targetX,
        targetY,
        isAnimating,

        handleDragOver,
        handleDragLeave,
        handleDrop,
        handleMouseMove,
    };
}
