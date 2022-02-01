<template>
    <div class="ww-input-file" @click="openFileExplorer">
        <!-- wwEditor:start -->
        <div v-if="isEditing" class="ww-input-file__icon">
            <wwEditorIcon small name="files" @mouseenter="isHover = true" @mouseleave="isHover = false"></wwEditorIcon>
        </div>
        <!-- wwEditor:end -->
        <wwElement class="ww-input-file__button" v-bind="content.button" />
        <wwElement
            class="ww-input-file__text"
            v-bind="content.text"
            :ww-props="{ text: fileName || 'No file chosen' }"
        />
        <input
            ref="inputFile"
            :value="localValue"
            class="ww-input-file__input"
            type="file"
            :name="wwElementState.name"
            :required="content.required"
            @input="handleManualInput($event.target.value)"
        />
    </div>
</template>

<script>
export default {
    props: {
        content: { type: Object, required: true },
        /* wwEditor:start */
        wwEditorState: { type: Object, required: true },
        /* wwEditor:end */
        uid: { type: String, required: true },
        wwElementState: { type: Object, required: true },
    },
    emits: ['trigger-event'],
    setup(props) {
        const { value: variableValue, setValue } = wwLib.wwVariable.useComponentVariable(
            props.uid,
            'value',
            props.content.value,
            'element',
            'file'
        );

        wwLib.wwVariable.useComponentVariable(props.uid, 'progress', props.content.progress, 'element', 'number');

        return { variableValue, setValue };
    },
    data() {
        return {
            localValue: null,
            fileName: null,
        };
    },
    computed: {
        isEditing() {
            /* wwEditor:start */
            return this.wwEditorState.editMode === wwLib.wwEditorHelper.EDIT_MODES.EDITION;
            /* wwEditor:end */
            // eslint-disable-next-line no-unreachable
            return false;
        },
        value() {
            return this.variableValue;
        },
    },
    methods: {
        handleManualInput(value) {
            if (value === this.localValue) return;
            const file = this.$refs['inputFile'].files[0];
            if (!file) return;
            this.localValue = value;
            this.fileName = file.name;
            this.setValue(file);
            this.$emit('trigger-event', { name: 'change', event: { value: file } });
        },
        openFileExplorer() {
            if (this.isEditing) return;
            this.$refs['inputFile'].click();
        },
    },
};
</script>

<style lang="scss" scoped>
.ww-input-file {
    display: flex;
    align-items: center;
    width: 100%;
    /* wwEditor:start */
    &__icon {
        pointer-events: auto;
        position: absolute;
        top: 0;
        left: 0;
        opacity: 0;
        z-index: 11;
        padding: var(--ww-spacing-01);
        color: var(--ww-color-white);
        border-radius: 100%;
        background-color: var(--ww-color-blue-500);
        transform: translate(-50%, -50%);
        transition: transform 0.3s ease;
    }
    &:hover &__icon {
        opacity: 1;
    }
    /* wwEditor:end */
    &__input {
        width: 0;
        pointer-events: none;
    }
}
</style>
