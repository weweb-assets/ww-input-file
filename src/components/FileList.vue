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

    &__inner {
        position: relative;
        perspective: 800px;
        transform-style: preserve-3d;
        min-height: 40px; // Ensure there's space for animations
    }
}

// File item transition animations - only for entering, not for leaving
.file-list-transition-enter-active {
    transition: all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.file-list-transition-enter-from {
    opacity: 0;
    transform: translateY(20px);
}

// Add staggered delay for sequential items
@for $i from 0 through 10 {
    .file-list-transition-enter-active:nth-child(#{$i + 1}) {
        transition-delay: #{$i * 0.1}s;
    }
}

.file-list-transition-move {
    transition: transform 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
}
</style>
