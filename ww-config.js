export default {
    editor: {
        label: { en: 'Input File', fr: 'Entrée de fichier' },
        icon: 'files',
        bubble: {
            icon: 'files',
        },
    },
    triggerEvents: [
        { name: 'change', label: { en: 'On change' }, event: { value: '' } },
        { name: 'initValueChange', label: { en: 'On init value change' }, event: { value: '' } },
    ],
    properties: {
        button: {
            defaultValue: { isWwObject: true, type: 'ww-button' },
            hidden: true,
        },
        text: {
            defaultValue: { isWwObject: true, type: 'ww-text' },
            hidden: true,
        },
        required: {
            label: { en: 'Required', fr: 'Requis' },
            type: 'OnOff',
            section: 'settings',
            defaultValue: true,
        },
    },
};
