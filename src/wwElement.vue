<template>
    <div
        class="ww-file-upload"
        :class="{
            'ww-file-upload--dragging': isDragging && !isDisabled && !isReadonly,
            'ww-file-upload--disabled': isDisabled,
            'ww-file-upload--readonly': isReadonly,
            'ww-file-upload--has-files': hasFiles,
        }"
        @dragover.prevent="handleDragOver"
        @dragleave.prevent="handleDragLeave"
        @drop.prevent="handleDrop"
        role="region"
        aria-label="File upload area"
    >
        <!-- Main upload area -->
        <div
            ref="dropzoneEl"
            class="ww-file-upload__dropzone"
            @click="openFileExplorer"
            @mousemove="handleMouseMove"
            v-if="alwaysShowUploadArea || !hasFiles || type === 'multi'"
        >
            <div
                v-if="isDragging && !isDisabled && !isReadonly && enableCircleAnimation"
                ref="circleEl"
                class="ww-file-upload__hover-circle"
                :style="{
                    left: `${mouseX}px`,
                    top: `${mouseY}px`,
                    backgroundColor: circleColor,
                    opacity: circleOpacity,
                    width: circleSize,
                    height: circleSize,
                }"
            ></div>

            <div class="ww-file-upload__content" :class="[`ww-file-upload__content--${uploadIconPosition}`]">
                <div v-if="showUploadIcon" class="ww-file-upload__icon" :style="iconStyle">
                    <div v-html="iconHTML"></div>
                </div>
                <div class="ww-file-upload__text">
                    <div class="ww-file-upload__label">{{ label }}</div>
                    <div class="ww-file-upload__info" v-if="hasTypeRestriction">
                        Allowed: {{ getAllowedTypesLabel() }}
                    </div>
                    <div class="ww-file-upload__info" v-if="maxFileSize">Max size: {{ maxFileSize }}MB</div>
                </div>
            </div>
        </div>

        <!-- File list -->
        <FileList
            v-if="hasFiles"
            :files="fileList"
            :type="type"
            :can-reorder="reorder"
            :is-readonly="isReadonly"
            :is-disabled="isDisabled"
            @remove="removeFile"
            @reorder="reorderFiles"
        />

        <!-- Hidden file input -->
        <input
            ref="fileInput"
            type="file"
            class="ww-file-upload__input"
            :multiple="type === 'multi'"
            :accept="acceptedFileTypes"
            :required="required && !hasFiles"
            :disabled="isDisabled || isReadonly"
            :aria-label="label"
            @change="handleFileSelection"
        />
    </div>
</template>

<script>
import { ref, computed, watch, provide, nextTick } from 'vue';
import anime from 'animejs/lib/anime.es.js';
import FileList from './components/FileList.vue';
import { validateFile } from './utils/fileValidation';
import { processFileForExport, getFileDetails } from './utils/fileProcessing';
import { useDragAnimation } from './composables/useDragAnimation';

export default {
    components: {
        FileList,
    },
    props: {
        content: { type: Object, required: true },
        /* wwEditor:start */
        wwEditorState: { type: Object, required: true },
        /* wwEditor:end */
        uid: { type: String, required: true },
        wwElementState: { type: Object, required: true },
    },
    emits: ['trigger-event', 'add-state', 'remove-state'],
    setup(props, { emit }) {
        const isEditing = computed(() => {
            /* wwEditor:start */
            return props.wwEditorState?.isEditing;
            /* wwEditor:end */
            // eslint-disable-next-line no-unreachable
            return false;
        });

        const { getIcon } = wwLib.useIcons();

        // Props and Refs
        const fileInput = ref(null);
        const dropzoneEl = ref(null);
        const circleEl = ref(null);
        const processingQueue = ref([]);
        const iconText = ref(null);
        const isProcessing = ref(false);

        // Content properties
        const type = computed(() => props.content?.type || 'single');
        const reorder = computed(() => props.content?.reorder || false);
        const drop = computed(() => props.content?.drop !== false);
        const maxFileSize = computed(() => props.content?.maxFileSize || 10);
        const minFileSize = computed(() => props.content?.minFileSize || 0);
        const maxTotalFileSize = computed(() => props.content?.maxTotalFileSize || 50);
        const maxFiles = computed(() => props.content?.maxFiles || 10);
        const required = computed(() => props.content?.required || false);
        const extensions = computed(() => props.content?.extensions || 'any');
        const customExtensions = computed(() => props.content?.customExtensions || '');
        const exposeBase64 = computed(() => props.content?.exposeBase64 || false);
        const exposeBinary = computed(() => props.content?.exposeBinary || false);
        const alwaysShowUploadArea = computed(() => props.content?.alwaysShowUploadArea !== false);
        const showUploadIcon = computed(() => props.content?.showUploadIcon !== false);
        const uploadIcon = computed(() => props.content?.uploadIcon || 'upload');
        const uploadIconColor = computed(() => props.content?.uploadIconColor || '#666666');
        const uploadIconPosition = computed(() => props.content?.uploadIconPosition || 'top');
        const uploadIconSize = computed(() => props.content?.uploadIconSize || '24px');
        const uploadIconMargin = computed(() => props.content?.uploadIconMargin || '8px');
        const label = computed(() => props.content?.label || 'Upload files');
        const enableCircleAnimation = computed(() => props.content?.enableCircleAnimation !== false);
        const circleSize = computed(() => props.content?.circleSize || '80px');
        const circleColor = computed(() => props.content?.circleColor || safeProgressBarColor.value);
        const circleOpacity = computed(() =>
            props.content?.circleOpacity !== undefined ? props.content.circleOpacity : 0.5
        );
        const animationSpeed = computed(() =>
            props.content?.animationSpeed !== undefined ? props.content.animationSpeed : 0.5
        );

        // Style properties
        const safeDropzoneBorderWidth = computed(() => props.content?.dropzoneBorderWidth || '2px');
        const safeDropzoneBorderStyle = computed(() => props.content?.dropzoneBorderStyle || 'dashed');
        const safeDropzoneBorderColor = computed(() => props.content?.dropzoneBorderColor || '#CCCCCC');
        const safeDropzoneBorderRadius = computed(() => props.content?.dropzoneBorderRadius || '8px');
        const safeDropzonePadding = computed(() => props.content?.dropzonePadding || '20px');
        const safeDropzoneMinHeight = computed(() => props.content?.dropzoneMinHeight || '120px');
        const safeDropzoneBackground = computed(() => props.content?.dropzoneBackground || 'rgba(0, 0, 0, 0.01)');
        const safeLabelFontSize = computed(() => props.content?.labelFontSize || '16px');
        const safeLabelFontFamily = computed(() => props.content?.labelFontFamily || 'inherit');
        const safeLabelFontWeight = computed(() => props.content?.labelFontWeight || 'normal');
        const safeLabelColor = computed(() => props.content?.labelColor || '#333333');
        const safeFileDetailsFontSize = computed(() => props.content?.fileDetailsFontSize || '12px');
        const safeFileDetailsColor = computed(() => props.content?.fileDetailsColor || '#888888');
        const safeProgressBarColor = computed(() => props.content?.progressBarColor || '#EEEEEE');
        const safeLabelMarginBottom = computed(() => {
            const labelMargin = props.content?.labelMargin || '0 0 4px 0';
            return labelMargin.split(' ')[2] || '4px';
        });
        const safeProgressBarBackground = computed(() => {
            const color = safeProgressBarColor.value;
            if (!color) return 'rgba(85, 85, 85, 0.05)';

            try {
                const r = parseInt(color.slice(1, 3), 16) || 85;
                const g = parseInt(color.slice(3, 5), 16) || 85;
                const b = parseInt(color.slice(5, 7), 16) || 85;
                return `rgba(${r}, ${g}, ${b}, 0.05)`;
            } catch (e) {
                return 'rgba(85, 85, 85, 0.05)';
            }
        });

        // Element state
        const isDisabled = computed(() => props.wwElementState.props.disabled || false);
        const isReadonly = computed(() => {
            /* wwEditor:start */
            if (props.wwEditorState?.isSelected) {
                return props.wwElementState.states.includes('readonly');
            }
            /* wwEditor:end */
            return props.wwElementState.props.readonly === undefined
                ? props.content?.readonly || false
                : props.wwElementState.props.readonly;
        });

        // Files handling
        const { value: files, setValue: setFiles } = wwLib.wwVariable.useComponentVariable({
            uid: props.uid,
            name: 'value',
            defaultValue: [],
            type: 'array',
        });

        const fileList = computed(() => (Array.isArray(files.value) ? files.value : []));
        const hasFiles = computed(() => fileList.value.length > 0);
        const acceptedFileTypes = computed(() => {
            switch (extensions.value) {
                case 'image':
                    return 'image/*';
                case 'video':
                    return 'video/*';
                case 'audio':
                    return 'audio/*';
                case 'pdf':
                    return '.pdf';
                case 'csv':
                    return '.csv';
                case 'excel':
                    return '.xls,.xlsx,.xlsm,.xlsb';
                case 'word':
                    return '.doc,.docx,.docm';
                case 'json':
                    return '.json';
                case 'custom':
                    return customExtensions.value;
                default:
                    return '';
            }
        });
        const hasTypeRestriction = computed(() => extensions.value && extensions.value !== 'any');

        // Upload icon
        watch(
            () => uploadIcon.value,
            async icon => {
                if (icon && showUploadIcon.value) {
                    try {
                        iconText.value = await getIcon(icon);
                    } catch (error) {
                        iconText.value = null;
                    }
                } else {
                    iconText.value = null;
                }
            },
            { immediate: true }
        );

        const iconHTML = computed(() => {
            /* wwEditor:start */
            return (
                iconText.value ||
                '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-upload"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>'
            );
            /* wwEditor:end */
            return iconText.value;
        });

        const iconStyle = computed(() => ({ color: uploadIconColor.value }));

        // Local data for element context
        const localData = ref({
            fileUpload: {
                value: fileList,
                queue: processingQueue,
                isUploading: false,
                uploadProgress: 0,
                isUploaded: false,
            },
        });

        if (exposeBase64.value) {
            localData.value.fileUpload.base64 = computed(() => fileList.value.map(file => file.base64 || null));
        }

        if (exposeBinary.value) {
            localData.value.fileUpload.binary = computed(() => fileList.value.map(file => file.binary || null));
        }

        provide('_wwFileUpload', {
            files: fileList,
            acceptedTypes: acceptedFileTypes,
            isDisabled,
            isReadonly,
            isSingleMode: computed(() => type.value === 'single'),
            content: computed(() => props.content || {}),
        });

        // Drag and drop animation
        const {
            isDragging,
            mouseX,
            mouseY,
            targetX,
            targetY,
            isAnimating,
            handleDragOver: animationHandleDragOver,
            handleDragLeave: animationHandleDragLeave,
            handleDrop: animationHandleDrop,
            handleMouseMove: animationHandleMouseMove,
        } = useDragAnimation({
            dropzoneRef: dropzoneEl,
            circleRef: circleEl,
            isDisabled,
            isReadonly,
            dropEnabled: drop,
            circleOpacity,
            animationSpeed,
            isEditing,
        });

        // Methods
        const openFileExplorer = () => {
            if (!isDisabled.value && !isReadonly.value && !isEditing.value) {
                fileInput.value.click();
            }
        };

        const handleDrop = async event => {
            const animationHandled = animationHandleDrop(event);
            if (!animationHandled || isDisabled.value || isReadonly.value || !drop.value) return;

            const items = event.dataTransfer.files;
            if (!items.length) return;

            // Wait for the circle animation to complete before processing files
            setTimeout(async () => {
                await processFiles(items);
            }, 1050);
        };

        const handleFileSelection = async event => {
            const selectedFiles = event.target.files;
            if (!selectedFiles.length) return;

            await processFiles(selectedFiles);
            event.target.value = '';
        };

        const processFiles = async fileList => {
            isProcessing.value = true;
            const filesToProcess = Array.from(fileList);

            // Single mode handling
            if (type.value === 'single') {
                if (filesToProcess.length > 1) {
                    emit('trigger-event', {
                        name: 'error',
                        event: {
                            code: 'SINGLE_MODE_MULTIPLE_FILES',
                            data: {
                                message: 'Multiple files provided in single file mode',
                                count: filesToProcess.length,
                                acceptedCount: 1,
                            },
                        },
                    });
                }

                filesToProcess.splice(1);
                setFiles([]);
            }

            // Check file count limit for multi mode
            let availableSlots = Infinity;
            if (type.value === 'multi' && maxFiles.value > 0) {
                availableSlots = maxFiles.value - files.value.length;
                if (availableSlots <= 0) {
                    emit('trigger-event', {
                        name: 'error',
                        event: {
                            code: 'MAX_FILES_REACHED',
                            data: {
                                message: `Maximum number of files (${maxFiles.value}) reached`,
                                maxFiles: maxFiles.value,
                                currentCount: files.value.length,
                            },
                        },
                    });

                    wwLib.wwNotification.open({
                        text: { en: `Maximum number of files (${maxFiles.value}) reached` },
                        color: 'warning',
                    });

                    isProcessing.value = false;
                    return;
                } else if (filesToProcess.length > availableSlots) {
                    emit('trigger-event', {
                        name: 'error',
                        event: {
                            code: 'TOO_MANY_FILES',
                            data: {
                                message: `Only ${availableSlots} more files can be added`,
                                providedCount: filesToProcess.length,
                                availableSlots: availableSlots,
                                maxFiles: maxFiles.value,
                                currentCount: files.value.length,
                            },
                        },
                    });
                }
            }

            // Process valid files
            const limitedFiles = filesToProcess.slice(0, availableSlots);
            const processedFiles = [];
            const currentTotalSize =
                files.value && Array.isArray(files.value) ? files.value.reduce((sum, f) => sum + (f.size || 0), 0) : 0;

            for (const file of limitedFiles) {
                const validationResult = validateFile(file, {
                    maxFileSize: maxFileSize.value,
                    minFileSize: minFileSize.value,
                    maxTotalFileSize: maxTotalFileSize.value,
                    currentTotalSize,
                    acceptedTypes: acceptedFileTypes.value,
                });

                if (validationResult.valid) {
                    processingQueue.value.push(file);
                    const fileDetails = await getFileDetails(file);

                    // Add unique ID for stable transitions
                    fileDetails.id = `file-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

                    if (exposeBase64.value || exposeBinary.value) {
                        const processedData = await processFileForExport(file, {
                            base64: exposeBase64.value,
                            binary: exposeBinary.value,
                        });

                        Object.assign(fileDetails, processedData);
                    }

                    processedFiles.push(fileDetails);
                    processingQueue.value = processingQueue.value.filter(f => f !== file);
                } else {
                    console.warn(`File validation failed: ${validationResult.reason}`);
                    emit('trigger-event', {
                        name: 'error',
                        event: {
                            code: 'VALIDATION_ERROR',
                            data: {
                                message: validationResult.reason,
                                fileName: file.name,
                                fileSize: file.size,
                                fileType: file.type,
                                constraint: validationResult.constraint,
                            },
                        },
                    });

                    wwLib.wwNotification.open({
                        text: { en: validationResult.reason },
                        color: 'error',
                    });
                }
            }

            if (processedFiles.length > 0) {
                if (type.value === 'single') {
                    // For single mode, just replace the files array
                    setFiles(processedFiles);
                    emit('trigger-event', {
                        name: 'change',
                        event: { value: processedFiles },
                    });
                    isProcessing.value = false;
                } else {
                    // For multi mode, add files one by one with a small delay for smoother animation
                    const currentFiles = [...files.value];
                    let newFiles = [...currentFiles];

                    // Function to add files one by one
                    const addNextFile = index => {
                        newFiles = [...newFiles, processedFiles[index]];
                        setFiles(newFiles);

                        // If more files to add, schedule the next one
                        if (index < processedFiles.length - 1) {
                            setTimeout(() => addNextFile(index + 1), 150);
                        } else {
                            // All files added, emit the change event
                            emit('trigger-event', {
                                name: 'change',
                                event: { value: newFiles },
                            });
                            isProcessing.value = false;
                        }
                    };

                    // Start adding files with a small initial delay
                    setTimeout(() => addNextFile(0), 50);
                    return; // Early return to prevent setting isProcessing to false too early
                }
            }

            isProcessing.value = false;
        };

        const removeFile = index => {
            if (isDisabled.value || isReadonly.value) return;

            const updatedFiles = [...files.value.filter((_, i) => i !== index)];
            setFiles(updatedFiles);

            emit('trigger-event', {
                name: 'change',
                event: { value: updatedFiles },
            });
        };

        const reorderFiles = (fromIndex, toIndex) => {
            if (isDisabled.value || isReadonly.value || !reorder.value) return;

            const newFiles = [...files.value];
            const [movedItem] = newFiles.splice(fromIndex, 1);
            newFiles.splice(toIndex, 0, movedItem);
            setFiles(newFiles);

            emit('trigger-event', {
                name: 'change',
                event: { value: newFiles },
            });
        };

        const clearFiles = () => {
            setFiles([]);
            emit('trigger-event', {
                name: 'change',
                event: { value: [] },
            });
        };

        const getAllowedTypesLabel = () => {
            switch (extensions.value) {
                case 'image':
                    return 'Images';
                case 'video':
                    return 'Videos';
                case 'audio':
                    return 'Audio files';
                case 'pdf':
                    return 'PDF files';
                case 'csv':
                    return 'CSV files';
                case 'excel':
                    return 'Excel files';
                case 'word':
                    return 'Word documents';
                case 'json':
                    return 'JSON files';
                case 'custom':
                    return customExtensions.value;
                default:
                    return 'All files';
            }
        };

        // Register element local context for API access
        wwLib.wwElement.useRegisterElementLocalContext('_wwFileUpload', localData.value.fileUpload, {
            clearFiles: {
                description: 'Clear all files',
                method: clearFiles,
                editor: { label: 'Clear Files', group: 'File Upload', icon: 'trash' },
            },
        });

        // Watch for state changes to emit appropriate events
        watch(
            isReadonly,
            value => {
                if (value) {
                    emit('add-state', 'readonly');
                } else {
                    emit('remove-state', 'readonly');
                }
            },
            { immediate: true }
        );

        watch(
            isDisabled,
            value => {
                if (value) {
                    emit('add-state', 'disabled');
                } else {
                    emit('remove-state', 'disabled');
                }
            },
            { immediate: true }
        );

        // Connect drag animation handlers
        const handleDragOver = animationHandleDragOver;
        const handleDragLeave = animationHandleDragLeave;
        const handleMouseMove = animationHandleMouseMove;

        return {
            fileInput,
            isDragging,
            fileList,
            hasFiles,
            isDisabled,
            isReadonly,
            acceptedFileTypes,
            hasTypeRestriction,
            openFileExplorer,
            handleDragOver,
            handleDragLeave,
            handleDrop,
            handleFileSelection,
            removeFile,
            reorderFiles,
            getAllowedTypesLabel,
            iconHTML,
            iconStyle,
            uploadIconPosition,
            handleMouseMove,

            type,
            reorder,
            drop,
            maxFileSize,
            minFileSize,
            maxFiles,
            required,
            extensions,
            customExtensions,
            alwaysShowUploadArea,
            showUploadIcon,
            uploadIcon,
            uploadIconColor,
            uploadIconSize,
            uploadIconMargin,
            label,
            enableCircleAnimation,
            circleSize,
            circleColor,
            circleOpacity,
            animationSpeed,

            safeDropzoneBorderWidth,
            safeDropzoneBorderStyle,
            safeDropzoneBorderColor,
            safeDropzoneBorderRadius,
            safeDropzonePadding,
            safeDropzoneMinHeight,
            safeDropzoneBackground,
            safeLabelFontSize,
            safeLabelFontFamily,
            safeLabelFontWeight,
            safeLabelColor,
            safeFileDetailsFontSize,
            safeFileDetailsColor,
            safeProgressBarColor,
            safeLabelMarginBottom,
            safeProgressBarBackground,
            dropzoneEl,
            circleEl,
            mouseX,
            mouseY,
            targetX,
            targetY,
            isAnimating,
            isProcessing,
            isEditing,
        };
    },
};
</script>

<style lang="scss" scoped>
.ww-file-upload {
    display: flex;
    flex-direction: column;
    width: 100%;
    position: relative;

    &__input {
        position: absolute;
        width: 0;
        height: 0;
        opacity: 0;
        pointer-events: none;
    }

    &__dropzone {
        position: relative;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        border: v-bind('safeDropzoneBorderWidth') v-bind('safeDropzoneBorderStyle') v-bind('safeDropzoneBorderColor');
        border-radius: v-bind('safeDropzoneBorderRadius');
        padding: v-bind('safeDropzonePadding');
        min-height: v-bind('safeDropzoneMinHeight');
        cursor: v-bind('isEditing ? "unset" : "pointer"');
        transition: all 0.3s ease;
        isolation: isolate;

        &:hover {
            border-color: v-bind('safeDropzoneBorderColor');
            background-color: v-bind('safeDropzoneBackground');
        }
    }

    &--has-files &__dropzone {
        margin-bottom: 16px;
    }

    &__content {
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        width: 100%;
        pointer-events: none;
        position: relative;
        z-index: 2;

        &--top {
            flex-direction: column;
        }

        &--right {
            flex-direction: row-reverse;
            justify-content: center;
            text-align: right;
        }

        &--bottom {
            flex-direction: column-reverse;
        }

        &--left {
            flex-direction: row;
            justify-content: center;
            text-align: left;
        }
    }

    &__text {
        display: flex;
        flex-direction: column;
        pointer-events: none;
    }

    &__icon {
        font-size: v-bind('uploadIconSize');
        width: 1em;
        height: 1em;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-shrink: 0;
        pointer-events: none;

        .ww-file-upload__content--top & {
            margin-bottom: v-bind('uploadIconMargin');
        }

        .ww-file-upload__content--right & {
            margin-left: v-bind('uploadIconMargin');
        }

        .ww-file-upload__content--bottom & {
            margin-top: v-bind('uploadIconMargin');
        }

        .ww-file-upload__content--left & {
            margin-right: v-bind('uploadIconMargin');
        }

        > :deep(svg) {
            width: 100%;
            height: 100%;
        }
    }

    &__label {
        font-size: v-bind('safeLabelFontSize');
        font-family: v-bind('safeLabelFontFamily');
        font-weight: v-bind('safeLabelFontWeight');
        margin-bottom: v-bind('safeLabelMarginBottom');
        color: v-bind('safeLabelColor');
    }

    &__info {
        font-size: v-bind('safeFileDetailsFontSize');
        color: v-bind('safeFileDetailsColor');
    }

    &--dragging {
        .ww-file-upload__dropzone {
            border-color: v-bind('safeProgressBarColor');
            background-color: v-bind('safeProgressBarBackground');
        }
    }

    &--disabled {
        opacity: 0.6;
        pointer-events: none;

        .ww-file-upload__dropzone {
            cursor: not-allowed;
            background-color: v-bind('safeDropzoneBackground');
        }
    }

    &--readonly {
        .ww-file-upload__dropzone {
            cursor: default;
            background-color: v-bind('safeDropzoneBackground');
        }
    }

    &__hover-circle {
        position: absolute;
        border-radius: 50%;
        pointer-events: none;
        z-index: -1;
        transform: translate(-50%, -50%);
        transition: opacity 0.3s ease-out, transform 0.3s ease-out;
        will-change: transform, opacity;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        backface-visibility: hidden;
    }
}
</style>
