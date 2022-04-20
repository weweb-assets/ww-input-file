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
                    { label: 'Any', value: 'ANY' },
                    { label: 'Image', value: 'image/*', icon: 'fontawesome/regular/file-image' },
                    { label: 'Video', value: 'video/*', icon: 'fontawesome/regular/file-video' },
                    { label: 'Audio', value: 'audio/*', icon: 'fontawesome/regular/file-audio' },
                    { label: 'PDF', value: '.pdf', icon: 'fontawesome/regular/file-pdf' },
                    { label: 'CSV', value: '.csv', icon: 'fontawesome/regular/file-csv' },
                    { label: 'Excel file', value: '.xls,.xlsb,.xlsm,.xlsx', icon: 'fontawesome/regular/file-excel' },
                    { label: 'Word file', value: '.doc,.docm,.docx', icon: 'fontawesome/regular/file-word' },
                    { label: 'JSON', value: '.json', icon: 'fontawesome/regular/file-code' },
                    { label: 'Custom', value: 'CUSTOM', icon: 'fontawesome/regular/file-edit' },
                ],
            },
            section: 'settings',
            defaultValue: 'any',
        },
        acceptCustom: {
            label: 'Exts',
            type: 'Text',
            options: {
                placeholder: '.json .xml .doc .docx',
            },
            section: 'settings',
            hidden: content => content.accept !== 'CUSTOM',
            defaultValue: '',
        },
    },
};
