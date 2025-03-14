<template>
    <div class="ww-file-list" role="list" aria-label="Uploaded files">
        <FileItem
            v-for="(file, index) in files"
            :key="index"
            :file="file"
            :index="index"
            :is-readonly="isReadonly"
            :is-disabled="isDisabled"
            :can-reorder="canReorder"
            @remove="$emit('remove', index)"
            @reorder="handleReorder(index, $event)"
        />
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
}
</style>
