<template>
    <div class="ww-file-list" role="list" aria-label="Uploaded files">
        <transition-group name="file-list-transition" tag="div" class="ww-file-list__inner">
            <FileItem
                v-for="(file, index) in files"
                :key="file.id || `file-${index}-${file.name}-${file.size}`"
                :file="file"
                :index="index"
                :is-readonly="isReadonly"
                :is-disabled="isDisabled"
                :can-reorder="canReorder"
                @remove="$emit('remove', index)"
                @reorder="handleReorder(index, $event)"
            />
        </transition-group>
    </div>
</template>

<script>
import { computed } from 'vue';
import FileItem from './FileItem.vue';

export default {
    name: 'FileList',
    components: {
        FileItem,
    },
    props: {
        files: {
            type: Array,
            required: true,
        },
        type: {
            type: String,
            default: 'single',
            validator: value => ['single', 'multi'].includes(value),
        },
        canReorder: {
            type: Boolean,
            default: false,
        },
        isReadonly: {
            type: Boolean,
            default: false,
        },
        isDisabled: {
            type: Boolean,
            default: false,
        },
    },
    emits: ['remove', 'reorder'],
    setup(props, { emit }) {
        const handleReorder = (index, direction) => {
            const newIndex = direction === 'up' ? index - 1 : index + 1;
            if (newIndex >= 0 && newIndex < props.files.length) {
                emit('reorder', index, newIndex);
            }
        };

        return {
            handleReorder,
        };
    },
};
</script>

<style lang="scss" scoped>
.ww-file-list {
    display: flex;
    flex-direction: column;
    width: 100%;
    overflow: hidden; // Contains the animations within the container

    &__inner {
        position: relative;
        min-height: 0; // Allow proper height calculations
        transition-property: height, opacity;
        transition-duration: 0.5s;
        transition-timing-function: cubic-bezier(0.25, 0.8, 0.25, 1);
        will-change: height, opacity, transform;
    }
}

// File item transition animations
.file-list-transition-enter-active {
    transition: all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
    transition-delay: 0.05s; // Slight delay to sync with container height
}

.file-list-transition-enter-from {
    opacity: 0;
    transform: translateY(20px);
}

.file-list-transition-move {
    transition: all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
}

// Add leave animation to ensure smooth height reduction
.file-list-transition-leave-active {
    transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
    position: absolute;
    width: 100%;
}
</style>
