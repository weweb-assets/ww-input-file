export default {
    editor: {
        label: 'Input File',
        icon: 'files',
        bubble: { icon: 'files' },
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
        multiple: {
            label: 'Multiple',
            type: 'OnOff',
            section: 'settings',
            defaultValue: false,
        },
        required: {
            label: 'Required',
            type: 'OnOff',
            section: 'settings',
            defaultValue: true,
        },
        accept: {
            label: 'Exts',
            type: 'TextSelect',
            options: {
                options: [
                    { label: 'Any', value: null },
                    { label: 'Image', value: 'image/*', icon: 'assets' },
                    { label: 'Video', value: 'video/*', icon: 'play' },
                    { label: 'Audio', value: 'audio/*', icon: 'video' },
                    { label: 'PDF', value: '.pdf' },
                    { label: 'CSV', value: '.csv', icon: 'csv' },
                    { label: 'Custom', value: 'CUSTOM' },
                ],
            },
            section: 'settings',
            defaultValue: null,
        },
    },
};
