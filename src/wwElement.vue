<template>
    <div class="ww-input-file" @click="openFileExplorer">
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
        const { value: variableValue, setValue } = wwLib.wwVariable.useComponentVariable({
            uid: props.uid,
            name: 'value',
            defaultValue: props.content.value,
            componentType: 'element',
            type: 'file',
            readonly: true
        });

        wwLib.wwVariable.useComponentVariable({
            uid: props.uid,
            name: 'progress',
            defaultValue: props.content.progress,
            componentType: 'element',
            type: 'number',
            readonly: true
        });

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
    &__input {
        width: 0;
        pointer-events: none;
    }
}
</style>
