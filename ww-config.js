export default {
    editor: {
        label: 'File Upload',
        icon: 'upload',
        bubble: { icon: 'upload' },
        customSettingsPropertiesOrder: [
            // UX properties
            ['formInfobox', 'fieldName', 'customValidation', 'validation'],
            [
                'type',
                'reorder',
                'drop',
                'maxFileSize',
                'minFileSize',
                'maxTotalFileSize',
                'maxFiles',
                'required',
                'readonly',
                'extensions',
                'customExtensions',
                'exposeBase64',
                'exposeBinary',
            ],
        ],
        customStylePropertiesOrder: [
            // Dropzone properties
            [
                'dropzoneTitle',
                'dropzoneBorderColor',
                'dropzoneBorderStyle',
                'dropzoneBorderWidth',
                'dropzoneBorderRadius',
                'dropzoneBackground',
                'dropzoneBackgroundHover',
                'dropzoneBackgroundDragging',
                'dropzonePadding',
                'dropzoneMinHeight',
            ],
        ],
        hint: (_, sidePanelContent) => {
            if (!sidePanelContent.parentSelection) return null;
            const { header, text, button, args } = sidePanelContent.parentSelection;
            const sections = ['style', 'settings'];
            return sections.map(section => ({
                section,
                header: header,
                text: text,
                button: {
                    text: button,
                    action: 'selectParent',
                    args,
                },
            }));
        },
    },
    options: {
        displayAllowedValues: ['flex', 'inline-flex', 'block'],
    },
    triggerEvents: [
        {
            name: 'change',
            label: { en: 'On change' },
            event: { value: [] },
            default: true,
        },
        {
            name: 'initValueChange',
            label: { en: 'On init value change' },
            event: { value: [] },
        },
        {
            name: 'error',
            label: { en: 'On error' },
            event: {
                code: 'VALIDATION_ERROR',
                data: { message: 'File validation failed' },
            },
        },
    ],
    actions: [
        {
            label: { en: 'Clear Files' },
            action: 'clearFiles',
            args: [],
        },
    ],
    properties: {
        type: {
            label: { en: 'Upload type' },
            type: 'TextSelect',
            options: {
                options: [
                    { value: 'single', label: { en: 'Single file' } },
                    { value: 'multi', label: { en: 'Multiple files' } },
                ],
            },
            section: 'settings',
            defaultValue: 'single',
            bindable: true,
            /* wwEditor:start */
            bindingValidation: {
                type: 'string',
                enum: ['single', 'multi'],
                tooltip: 'A string that defines the upload type: `"single" | "multi"`',
            },
            /* wwEditor:end */
        },
        drop: {
            label: { en: 'Allow drag & drop' },
            type: 'OnOff',
            section: 'settings',
            defaultValue: true,
            bindable: true,
            /* wwEditor:start */
            bindingValidation: {
                type: 'boolean',
                tooltip: 'A boolean that defines if drag and drop is enabled: `true | false`',
            },
            /* wwEditor:end */
        },
        maxFileSize: {
            label: { en: 'Max file size (MB)' },
            type: 'Number',
            options: { min: 0 },
            section: 'settings',
            defaultValue: 10,
            bindable: true,
            /* wwEditor:start */
            bindingValidation: {
                type: 'number',
                tooltip: 'A number that defines the maximum allowed file size in MB: `10`',
            },
            /* wwEditor:end */
        },
        minFileSize: {
            label: { en: 'Min file size (MB)' },
            type: 'Number',
            options: { min: 0 },
            section: 'settings',
            defaultValue: 0,
            bindable: true,
            /* wwEditor:start */
            bindingValidation: {
                type: 'number',
                tooltip: 'A number that defines the minimum allowed file size in MB: `0`',
            },
            /* wwEditor:end */
        },
        maxTotalFileSize: {
            label: { en: 'Max total size (MB)' },
            type: 'Number',
            options: { min: 0 },
            section: 'settings',
            defaultValue: 50,
            hidden: content => content.type !== 'multi',
            bindable: true,
            /* wwEditor:start */
            bindingValidation: {
                type: 'number',
                tooltip: 'A number that defines the maximum total file size in MB: `50`',
            },
            /* wwEditor:end */
        },
        maxFiles: {
            label: { en: 'Max number of files' },
            type: 'Number',
            options: { min: 1 },
            section: 'settings',
            defaultValue: 10,
            hidden: content => content.type !== 'multi',
            bindable: true,
            /* wwEditor:start */
            bindingValidation: {
                type: 'number',
                tooltip: 'A number that defines the maximum number of files allowed: `10`',
            },
            /* wwEditor:end */
        },
        required: {
            label: { en: 'Required' },
            type: 'OnOff',
            section: 'settings',
            defaultValue: false,
            bindable: true,
            /* wwEditor:start */
            bindingValidation: {
                type: 'boolean',
                tooltip: 'A boolean that defines if the upload is required: `true | false`',
            },
            /* wwEditor:end */
        },
        readonly: {
            label: { en: 'Read only' },
            type: 'OnOff',
            section: 'settings',
            defaultValue: false,
            bindable: true,
            hidden: (content, sidePanelContent, boundProps, wwProps) => !!(wwProps && wwProps.readonly !== undefined),
            /* wwEditor:start */
            bindingValidation: {
                type: 'boolean',
                tooltip: 'A boolean that defines if the upload is in readonly mode: `true | false`',
            },
            /* wwEditor:end */
        },
        extensions: {
            label: { en: 'Allowed file types' },
            type: 'TextSelect',
            options: {
                options: [
                    { value: 'any', label: { en: 'Any' } },
                    { value: 'image', label: { en: 'Image' } },
                    { value: 'video', label: { en: 'Video' } },
                    { value: 'audio', label: { en: 'Audio' } },
                    { value: 'pdf', label: { en: 'PDF' } },
                    { value: 'csv', label: { en: 'CSV' } },
                    { value: 'excel', label: { en: 'Excel' } },
                    { value: 'word', label: { en: 'Word' } },
                    { value: 'json', label: { en: 'JSON' } },
                    { value: 'custom', label: { en: 'Custom' } },
                ],
            },
            section: 'settings',
            defaultValue: 'any',
            bindable: true,
            /* wwEditor:start */
            bindingValidation: {
                type: 'string',
                tooltip: 'A string that defines the allowed file types: `"any" | "image" | "video" | "custom"`',
            },
            /* wwEditor:end */
        },
        customExtensions: {
            type: 'Text',
            options: { placeholder: '.html, .xml, .pt' },
            section: 'settings',
            hidden: content => content.extensions !== 'custom',
            defaultValue: '',
            bindable: true,
            /* wwEditor:start */
            bindingValidation: {
                type: 'string',
                tooltip: 'A comma-separated list of allowed file extensions: `".html, .xml, .pt"`',
            },
            /* wwEditor:end */
        },
        exposeBase64: {
            label: { en: 'Expose as Base64' },
            type: 'OnOff',
            section: 'settings',
            defaultValue: false,
            bindable: true,
            /* wwEditor:start */
            bindingValidation: {
                type: 'boolean',
                tooltip: 'A boolean that defines if files should be exposed as Base64: `true | false`',
            },
            propertyHelp: {
                tooltip:
                    "Base64 strings can be very large, so we crop them when displayed in the editor interface. Don't worry, the variable contains the full value when it is used.",
            },
            /* wwEditor:end */
        },
        exposeBinary: {
            label: { en: 'Expose as Binary' },
            type: 'OnOff',
            section: 'settings',
            defaultValue: false,
            bindable: true,
            /* wwEditor:start */
            bindingValidation: {
                type: 'boolean',
                tooltip: 'A boolean that defines if files should be exposed as Binary: `true | false`',
            },
            propertyHelp: {
                tooltip:
                    'Binary data is a special object that can be very large in size. It will appear as an empty object in the editor interface. To inspect it, you can log it to the console.',
            },
            /* wwEditor:end */
        },

        // ======== DROPZONE PROPERTIES ========
        dropzoneTitle: {
            type: 'Title',
            label: { en: 'Dropzone' },
            section: 'style',
        },
        dropzoneBorderColor: {
            label: { en: 'Border color' },
            type: 'Color',
            section: 'style',
            defaultValue: 'transparent',
            classes: true,
            states: true,
            responsive: true,
            bindable: true,
        },
        dropzoneBorderStyle: {
            label: { en: 'Border style' },
            type: 'TextSelect',
            section: 'style',
            options: {
                options: [
                    { value: 'solid', label: 'Solid' },
                    { value: 'dashed', label: 'Dashed' },
                    { value: 'dotted', label: 'Dotted' },
                    { value: 'none', label: 'None' },
                ],
            },
            defaultValue: 'none',
            classes: true,
            states: true,
            responsive: true,
            bindable: true,
        },
        dropzoneBorderWidth: {
            label: { en: 'Border width' },
            type: 'Length',
            section: 'style',
            options: {
                unitChoices: [{ value: 'px', label: 'px', min: 0, max: 10 }],
            },
            defaultValue: '0px',
            classes: true,
            states: true,
            responsive: true,
            bindable: true,
        },
        dropzoneBorderRadius: {
            label: { en: 'Border radius' },
            type: 'Length',
            section: 'style',
            options: {
                unitChoices: [
                    { value: 'px', label: 'px', min: 0, max: 100 },
                    { value: '%', label: '%', min: 0, max: 50 },
                ],
            },
            defaultValue: '0px',
            classes: true,
            states: true,
            responsive: true,
            bindable: true,
        },
        dropzoneBackground: {
            label: { en: 'Background color' },
            type: 'Color',
            section: 'style',
            defaultValue: 'transparent',
            classes: true,
            states: true,
            responsive: true,
            bindable: true,
        },
        dropzoneBackgroundHover: {
            label: { en: 'Background color hover' },
            type: 'Color',
            section: 'style',
            defaultValue: 'transparent',
            classes: true,
            states: true,
            responsive: true,
            bindable: true,
        },
        dropzoneBackgroundDragging: {
            label: { en: 'Background color dragging' },
            type: 'Color',
            section: 'style',
            defaultValue: 'rgba(0, 0, 0, 0.05)',
            classes: true,
            states: true,
            responsive: true,
            bindable: true,
        },
        dropzonePadding: {
            label: { en: 'Padding' },
            type: 'Spacing',
            section: 'style',
            defaultValue: '0px',
            classes: true,
            states: true,
            responsive: true,
            bindable: true,
        },
        dropzoneMinHeight: {
            label: { en: 'Min height' },
            type: 'Length',
            section: 'style',
            options: {
                unitChoices: [
                    { value: 'px', label: 'px', min: 0, max: 500 },
                    { value: 'vh', label: 'vh', min: 0, max: 100 },
                ],
            },
            defaultValue: '0px',
            classes: true,
            states: true,
            responsive: true,
            bindable: true,
        },
        // FORM PROPERTIES: Mainly used in the sidepanel for UX purposes
        /* wwEditor:start */
        parentSelection: {
            editorOnly: true,
            defaultValue: false,
        },
        /* wwEditor:end */
        /* wwEditor:start */
        form: {
            editorOnly: true,
            hidden: true,
            defaultValue: false,
        },
        formInfobox: {
            type: 'InfoBox',
            section: 'settings',
            options: (_, sidePanelContent) => ({
                variant: sidePanelContent.form?.name ? 'success' : 'warning',
                icon: 'pencil',
                title: sidePanelContent.form?.name || 'Unnamed form',
                content: !sidePanelContent.form?.name && 'Give your form a meaningful name.',
            }),
            hidden: (_, sidePanelContent) => !sidePanelContent.form?.uid,
        },
        /* wwEditor:end */
        fieldName: {
            label: 'Field name',
            section: 'settings',
            type: 'Text',
            defaultValue: '',
            bindable: true,
            hidden: (_, sidePanelContent) => {
                return !sidePanelContent.form?.uid;
            },
        },
        customValidation: {
            label: 'Custom validation',
            section: 'settings',
            type: 'OnOff',
            defaultValue: false,
            bindable: true,
            hidden: (_, sidePanelContent) => {
                return !sidePanelContent.form?.uid;
            },
        },
        validation: {
            label: 'Validation',
            section: 'settings',
            type: 'Formula',
            defaultValue: '',
            bindable: false,
            hidden: (content, sidePanelContent) => {
                return !sidePanelContent.form?.uid || !content.customValidation;
            },
        },
    },
};