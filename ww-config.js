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
                'dropzonePadding',
                'dropzoneMinHeight',
            ],
            // Icon properties
            [
                'iconTitle',
                'showUploadIcon',
                'uploadIcon',
                'uploadIconColor',
                'uploadIconSize',
                'uploadIconMargin',
                'uploadIconPosition',
            ],
            // Label properties
            [
                'labelTitle',
                'labelMessage',
                'labelFontFamily',
                'labelFontSize',
                'labelFontWeight',
                'labelColor',
                'labelMargin',
            ],
            // Info messages properties
            [
                'infoMessagesTitle',
                'extensionsMessage',
                'extensionsMessageFontFamily',
                'extensionsMessageFontSize',
                'extensionsMessageFontWeight',
                'extensionsMessageColor',
                'extensionsMessageMargin',
                'maxFileMessage',
                'maxFileMessageFontFamily',
                'maxFileMessageFontSize',
                'maxFileMessageFontWeight',
                'maxFileMessageColor',
                'maxFileMessageMargin',
            ],
            // File list properties
            [
                'fileListTitle',
                'fileItemBackground',
                'fileItemBorderColor',
                'fileItemBorderRadius',
                'fileItemPadding',
                'fileItemMargin',
                'fileItemShadow',
                'progressBarColor',
                'fileItemHoverTitle',
                'fileItemHoverBorderColor',
                'fileItemHoverBackground',
                'fileItemHoverShadow',
            ],
            // File details properties
            [
                'fileNameTitle',
                'fileNameFontFamily',
                'fileNameFontSize',
                'fileNameFontWeight',
                'fileNameColor',
                'fileDetailsTitle',
                'showFileInfo',
                'fileDetailsFontFamily',
                'fileDetailsFontSize',
                'fileDetailsFontWeight',
                'fileDetailsColor',
            ],
            // Action buttons properties
            [
                'actionButtonsTitle',
                'actionButtonSize',
                'actionButtonBackground',
                'actionButtonHoverBackground',
                'actionButtonColor',
                'actionButtonBorderColor',
                'actionButtonHoverBorderColor',
                'actionButtonBorderRadius',
                'actionButtonMargin',
            ],
            // Circle animation properties
            [
                'circleAnimationTitle',
                'enableCircleAnimation',
                'circleSize',
                'circleColor',
                'circleOpacity',
                'animationSpeed',
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
            action: 'actionClearFiles',
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
        showFileInfo: {
            label: { en: 'Show file details' },
            type: 'OnOff',
            defaultValue: true,
            bindable: true,
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
            defaultValue: '#CCCCCC',
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
            defaultValue: 'dashed',
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
            defaultValue: '2px',
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
            defaultValue: '8px',
            classes: true,
            states: true,
            responsive: true,
            bindable: true,
        },
        dropzoneBackground: {
            label: { en: 'Background color' },
            type: 'Color',
            section: 'style',
            defaultValue: 'rgba(0, 0, 0, 0.01)',
            classes: true,
            states: true,
            responsive: true,
            bindable: true,
        },
        dropzoneBackgroundHover: {
            label: { en: 'Background color hover' },
            type: 'Color',
            section: 'style',
            defaultValue: 'rgba(0, 0, 0, 0.01)',
            classes: true,
            states: true,
            responsive: true,
            bindable: true,
        },
        dropzonePadding: {
            label: { en: 'Padding' },
            type: 'Spacing',
            section: 'style',
            defaultValue: '20px',
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
            defaultValue: '120px',
            classes: true,
            states: true,
            responsive: true,
            bindable: true,
        },

        // ======== ICON PROPERTIES ========
        iconTitle: {
            type: 'Title',
            label: { en: 'Icon' },
            section: 'icon',
        },
        showUploadIcon: {
            label: { en: 'Show upload icon' },
            type: 'OnOff',
            section: 'icon',
            defaultValue: true,
            bindable: true,
            /* wwEditor:start */
            bindingValidation: {
                type: 'boolean',
                tooltip: 'A boolean that defines if the upload icon should be displayed: `true | false`',
            },
            /* wwEditor:end */
        },
        uploadIcon: {
            label: { en: 'Upload icon' },
            type: 'SystemIcon',
            section: 'icon',
            defaultValue: 'upload',
            bindable: true,
            hidden: content => !content.showUploadIcon,
            /* wwEditor:start */
            bindingValidation: {
                type: 'string',
                tooltip: 'A string that defines the upload icon code',
            },
            /* wwEditor:end */
        },
        uploadIconPosition: {
            label: { en: 'Icon position' },
            type: 'TextSelect',
            options: {
                options: [
                    { value: 'top', label: { en: 'Top' } },
                    { value: 'right', label: { en: 'Right' } },
                    { value: 'bottom', label: { en: 'Bottom' } },
                    { value: 'left', label: { en: 'Left' } },
                ],
            },
            section: 'icon',
            defaultValue: 'top',
            hidden: content => !content.showUploadIcon,
            bindable: true,
            /* wwEditor:start */
            bindingValidation: {
                type: 'string',
                enum: ['top', 'right', 'bottom', 'left'],
                tooltip:
                    'A string that defines the position of the icon relative to the text: `"top" | "right" | "bottom" | "left"`',
            },
            /* wwEditor:end */
        },
        uploadIconColor: {
            label: { en: 'Icon color' },
            type: 'Color',
            section: 'icon',
            defaultValue: '#666666',
            bindable: true,
            hidden: content => !content.showUploadIcon,
            options: {
                nullable: true,
            },
            /* wwEditor:start */
            bindingValidation: {
                type: 'string',
                tooltip: 'The color of the icon',
            },
            /* wwEditor:end */
        },
        uploadIconSize: {
            label: { en: 'Size' },
            type: 'Length',
            section: 'icon',
            options: {
                unitChoices: [
                    { value: 'px', label: 'px', min: 12, max: 100 },
                    { value: 'em', label: 'em', min: 0.5, max: 6 },
                    { value: 'rem', label: 'rem', min: 0.5, max: 6 },
                ],
            },
            defaultValue: '24px',
            classes: true,
            states: true,
            responsive: true,
            hidden: content => !content.showUploadIcon,
            bindable: true,
        },
        uploadIconMargin: {
            label: { en: 'Margin' },
            type: 'Spacing',
            section: 'icon',
            defaultValue: '8px',
            classes: true,
            states: true,
            responsive: true,
            hidden: content => !content.showUploadIcon,
            bindable: true,
        },

        // ======== LABEL PROPERTIES ========
        labelTitle: {
            type: 'Title',
            label: { en: 'Label' },
            section: 'style',
        },
        labelMessage: {
            label: { en: 'Label' },
            type: 'Text',
            defaultValue: 'Drop files here or click to upload',
            bindable: true,
            /* wwEditor:start */
            bindingValidation: {
                type: 'string',
                tooltip: 'A string that defines the label message: `"Drop files here or click to upload"`',
            },
            /* wwEditor:end */
        },
        labelFontFamily: {
            label: { en: 'Font family' },
            type: 'FontFamily',
            section: 'style',
            defaultValue: null,
            classes: true,
            states: true,
            responsive: true,
            bindable: true,
        },
        labelFontSize: {
            label: { en: 'Font size' },
            type: 'Length',
            section: 'style',
            options: {
                unitChoices: [
                    { value: 'px', label: 'px', min: 8, max: 64 },
                    { value: 'em', label: 'em', min: 0.5, max: 4 },
                    { value: 'rem', label: 'rem', min: 0.5, max: 4 },
                ],
            },
            defaultValue: '16px',
            classes: true,
            states: true,
            responsive: true,
            bindable: true,
        },
        labelFontWeight: {
            label: { en: 'Font weight' },
            type: 'TextSelect',
            section: 'style',
            options: {
                options: [
                    { value: null, label: { en: 'Default' } },
                    { value: 300, label: { en: '300 - Light' } },
                    { value: 400, label: { en: '400 - Regular' } },
                    { value: 500, label: { en: '500 - Medium' } },
                    { value: 600, label: { en: '600 - Semi Bold' } },
                    { value: 700, label: { en: '700 - Bold' } },
                ],
            },
            defaultValue: null,
            classes: true,
            states: true,
            responsive: true,
            bindable: true,
        },
        labelColor: {
            label: { en: 'Color' },
            type: 'Color',
            section: 'style',
            defaultValue: '#333333',
            classes: true,
            states: true,
            responsive: true,
            bindable: true,
        },
        labelMargin: {
            label: { en: 'Margin' },
            type: 'Spacing',
            section: 'style',
            defaultValue: '0 0 4px 0',
            classes: true,
            states: true,
            responsive: true,
            bindable: true,
        },

        // ======== INFO MESSAGES PROPERTIES ========
        infoMessagesTitle: {
            type: 'Title',
            label: { en: 'Info Messages' },
            section: 'style',
        },
        extensionsMessage: {
            label: { en: 'Extensions message' },
            type: 'Text',
            defaultValue: 'Allowed file types: {extensions}',
            bindable: true,
            /* wwEditor:start */
            bindingValidation: {
                type: 'string',
                tooltip:
                    'A string that defines the message to display when an invalid file type is uploaded: `"Allowed file types: {extensions}"`',
            },
            /* wwEditor:end */
        },
        extensionsMessageFontFamily: {
            label: { en: 'Extensions message font family' },
            type: 'FontFamily',
            section: 'style',
            defaultValue: null,
            classes: true,
            states: true,
            responsive: true,
            bindable: true,
        },
        extensionsMessageFontSize: {
            label: { en: 'Extensions message font size' },
            type: 'Length',
            section: 'style',
            options: {
                unitChoices: [
                    { value: 'px', label: 'px', min: 8, max: 64 },
                    { value: 'em', label: 'em', min: 0.5, max: 4 },
                    { value: 'rem', label: 'rem', min: 0.5, max: 4 },
                ],
            },
            defaultValue: '12px',
            classes: true,
            states: true,
            responsive: true,
            bindable: true,
        },
        extensionsMessageFontWeight: {
            label: { en: 'Extensions message font weight' },
            type: 'TextSelect',
            section: 'style',
            options: {
                options: [
                    { value: null, label: { en: 'Default' } },
                    { value: 300, label: { en: '300 - Light' } },
                    { value: 400, label: { en: '400 - Regular' } },
                    { value: 500, label: { en: '500 - Medium' } },
                    { value: 600, label: { en: '600 - Semi Bold' } },
                    { value: 700, label: { en: '700 - Bold' } },
                ],
            },
            defaultValue: 400,
            classes: true,
            states: true,
            responsive: true,
            bindable: true,
        },
        extensionsMessageColor: {
            label: { en: 'Extensions message color' },
            type: 'Color',
            section: 'style',
            defaultValue: '#888888',
            classes: true,
            states: true,
            responsive: true,
            bindable: true,
        },
        extensionsMessageMargin: {
            label: { en: 'Extensions message margin' },
            type: 'Spacing',
            section: 'style',
            defaultValue: '0 0 4px 0',
            classes: true,
            states: true,
            responsive: true,
            bindable: true,
        },
        maxFileMessage: {
            label: { en: 'Max file message' },
            type: 'Text',
            defaultValue: 'Max file size: {maxFileSize} MB',
            bindable: true,
            /* wwEditor:start */
            bindingValidation: {
                type: 'string',
                tooltip: 'A string that defines the max file message: `"Max file size: {maxFileSize} MB"`',
            },
            /* wwEditor:end */
        },
        maxFileMessageFontFamily: {
            label: { en: 'Max file message font family' },
            type: 'FontFamily',
            section: 'style',
            defaultValue: null,
            classes: true,
            states: true,
            responsive: true,
            bindable: true,
        },
        maxFileMessageFontSize: {
            label: { en: 'Max file message font size' },
            type: 'Length',
            section: 'style',
            options: {
                unitChoices: [
                    { value: 'px', label: 'px', min: 8, max: 64 },
                    { value: 'em', label: 'em', min: 0.5, max: 4 },
                    { value: 'rem', label: 'rem', min: 0.5, max: 4 },
                ],
            },
            defaultValue: '12px',
            classes: true,
            states: true,
            responsive: true,
            bindable: true,
        },
        maxFileMessageFontWeight: {
            label: { en: 'Max file message font weight' },
            type: 'TextSelect',
            section: 'style',
            options: {
                options: [
                    { value: null, label: { en: 'Default' } },
                    { value: 300, label: { en: '300 - Light' } },
                    { value: 400, label: { en: '400 - Regular' } },
                    { value: 500, label: { en: '500 - Medium' } },
                    { value: 600, label: { en: '600 - Semi Bold' } },
                    { value: 700, label: { en: '700 - Bold' } },
                ],
            },
            defaultValue: 400,
            classes: true,
            states: true,
            responsive: true,
            bindable: true,
        },
        maxFileMessageColor: {
            label: { en: 'Max file message color' },
            type: 'Color',
            section: 'style',
            defaultValue: '#888888',
            classes: true,
            states: true,
            responsive: true,
            bindable: true,
        },
        maxFileMessageMargin: {
            label: { en: 'Max file message margin' },
            type: 'Spacing',
            section: 'style',
            defaultValue: '0 0 4px 0',
            classes: true,
            states: true,
            responsive: true,
            bindable: true,
        },

        // ======== FILE LIST PROPERTIES ========
        fileListTitle: {
            type: 'Title',
            label: { en: 'File List' },
            section: 'style',
        },
        fileItemBackground: {
            label: { en: 'Background color' },
            type: 'Color',
            section: 'style',
            defaultValue: '#FFFFFF',
            classes: true,
            states: true,
            responsive: true,
            bindable: true,
        },
        fileItemBorderColor: {
            label: { en: 'Border color' },
            type: 'Color',
            section: 'style',
            defaultValue: '#EEEEEE',
            classes: true,
            states: true,
            responsive: true,
            bindable: true,
        },
        fileItemBorderRadius: {
            label: { en: 'Border radius' },
            type: 'Length',
            section: 'style',
            options: {
                unitChoices: [
                    { value: 'px', label: 'px', min: 0, max: 100 },
                    { value: '%', label: '%', min: 0, max: 50 },
                ],
            },
            defaultValue: '6px',
            classes: true,
            states: true,
            responsive: true,
            bindable: true,
        },
        fileItemPadding: {
            label: { en: 'Padding' },
            type: 'Spacing',
            section: 'style',
            defaultValue: '12px',
            classes: true,
            states: true,
            responsive: true,
            bindable: true,
        },
        fileItemMargin: {
            label: { en: 'Margin' },
            type: 'Spacing',
            section: 'style',
            defaultValue: '0 0 8px 0',
            classes: true,
            states: true,
            responsive: true,
            bindable: true,
        },
        fileItemShadow: {
            label: { en: 'Shadow' },
            type: 'Shadows',
            section: 'style',
            defaultValue: '0 2px 4px rgba(0, 0, 0, 0.05)',
            classes: true,
            states: true,
            responsive: true,
            bindable: true,
        },
        progressBarColor: {
            label: { en: 'Progress bar color' },
            type: 'Color',
            section: 'style',
            defaultValue: '#4CAF50',
            classes: true,
            states: true,
            responsive: true,
            bindable: true,
        },
        fileItemHoverTitle: {
            type: 'Title',
            label: { en: 'File Item Hover States' },
            section: 'style',
        },
        fileItemHoverBorderColor: {
            label: { en: 'Hover border color' },
            type: 'Color',
            section: 'style',
            defaultValue: '#DDDDDD',
            classes: true,
            states: true,
            responsive: true,
            bindable: true,
        },
        fileItemHoverBackground: {
            label: { en: 'Hover background color' },
            type: 'Color',
            section: 'style',
            defaultValue: '#FFFFFF',
            classes: true,
            states: true,
            responsive: true,
            bindable: true,
        },
        fileItemHoverShadow: {
            label: { en: 'Hover shadow' },
            type: 'Shadows',
            section: 'style',
            defaultValue: '0 2px 4px rgba(0, 0, 0, 0.05)',
            classes: true,
            states: true,
            responsive: true,
            bindable: true,
        },

        // ======== FILE DETAILS PROPERTIES ========
        fileNameTitle: {
            type: 'Title',
            label: { en: 'File Name' },
            section: 'style',
        },
        fileNameFontFamily: {
            label: { en: 'Font family' },
            type: 'FontFamily',
            section: 'style',
            defaultValue: null,
            classes: true,
            states: true,
            responsive: true,
            bindable: true,
        },
        fileNameFontSize: {
            label: { en: 'Font size' },
            type: 'Length',
            section: 'style',
            options: {
                unitChoices: [
                    { value: 'px', label: 'px', min: 8, max: 64 },
                    { value: 'em', label: 'em', min: 0.5, max: 4 },
                    { value: 'rem', label: 'rem', min: 0.5, max: 4 },
                ],
            },
            defaultValue: '14px',
            classes: true,
            states: true,
            responsive: true,
            bindable: true,
        },
        fileNameFontWeight: {
            label: { en: 'Font weight' },
            type: 'TextSelect',
            section: 'style',
            options: {
                options: [
                    { value: null, label: { en: 'Default' } },
                    { value: 300, label: { en: '300 - Light' } },
                    { value: 400, label: { en: '400 - Regular' } },
                    { value: 500, label: { en: '500 - Medium' } },
                    { value: 600, label: { en: '600 - Semi Bold' } },
                    { value: 700, label: { en: '700 - Bold' } },
                ],
            },
            defaultValue: 500,
            classes: true,
            states: true,
            responsive: true,
            bindable: true,
        },
        fileNameColor: {
            label: { en: 'Color' },
            type: 'Color',
            section: 'style',
            defaultValue: '#333333',
            classes: true,
            states: true,
            responsive: true,
            bindable: true,
        },
        fileDetailsTitle: {
            type: 'Title',
            label: { en: 'File Details' },
            section: 'style',
        },
        fileDetailsFontFamily: {
            label: { en: 'Font family' },
            type: 'FontFamily',
            section: 'style',
            defaultValue: null,
            classes: true,
            states: true,
            responsive: true,
            bindable: true,
        },
        fileDetailsFontSize: {
            label: { en: 'Font size' },
            type: 'Length',
            section: 'style',
            options: {
                unitChoices: [
                    { value: 'px', label: 'px', min: 8, max: 64 },
                    { value: 'em', label: 'em', min: 0.5, max: 4 },
                    { value: 'rem', label: 'rem', min: 0.5, max: 4 },
                ],
            },
            defaultValue: '12px',
            classes: true,
            states: true,
            responsive: true,
            bindable: true,
        },
        fileDetailsFontWeight: {
            label: { en: 'Font weight' },
            type: 'TextSelect',
            section: 'style',
            options: {
                options: [
                    { value: null, label: { en: 'Default' } },
                    { value: 300, label: { en: '300 - Light' } },
                    { value: 400, label: { en: '400 - Regular' } },
                    { value: 500, label: { en: '500 - Medium' } },
                    { value: 600, label: { en: '600 - Semi Bold' } },
                    { value: 700, label: { en: '700 - Bold' } },
                ],
            },
            defaultValue: 400,
            classes: true,
            states: true,
            responsive: true,
            bindable: true,
        },
        fileDetailsColor: {
            label: { en: 'Color' },
            type: 'Color',
            section: 'style',
            defaultValue: '#888888',
            classes: true,
            states: true,
            responsive: true,
            bindable: true,
        },

        // ======== ACTION BUTTON PROPERTIES ========
        actionButtonsTitle: {
            type: 'Title',
            label: { en: 'Remove Buttons' },
            section: 'style',
        },
        actionButtonSize: {
            label: { en: 'Size' },
            type: 'Length',
            section: 'style',
            options: {
                unitChoices: [
                    { value: 'px', label: 'px', min: 16, max: 64 },
                    { value: 'em', label: 'em', min: 1, max: 4 },
                    { value: 'rem', label: 'rem', min: 1, max: 4 },
                ],
            },
            defaultValue: '28px',
            classes: true,
            states: true,
            responsive: true,
            bindable: true,
        },
        actionButtonBackground: {
            label: { en: 'Background color' },
            type: 'Color',
            section: 'style',
            defaultValue: '#FFFFFF',
            classes: true,
            states: true,
            responsive: true,
            bindable: true,
        },
        actionButtonHoverBackground: {
            label: { en: 'Hover background color' },
            type: 'Color',
            section: 'style',
            defaultValue: '#F8F8F8',
            classes: true,
            states: true,
            responsive: true,
            bindable: true,
        },
        actionButtonColor: {
            label: { en: 'Icon color' },
            type: 'Color',
            section: 'style',
            defaultValue: '#666666',
            classes: true,
            states: true,
            responsive: true,
            bindable: true,
        },
        actionButtonBorderColor: {
            label: { en: 'Border color' },
            type: 'Color',
            section: 'style',
            defaultValue: '#EEEEEE',
            classes: true,
            states: true,
            responsive: true,
            bindable: true,
        },
        actionButtonHoverBorderColor: {
            label: { en: 'Hover border color' },
            type: 'Color',
            section: 'style',
            defaultValue: '#DDDDDD',
            classes: true,
            states: true,
            responsive: true,
            bindable: true,
        },
        actionButtonBorderRadius: {
            label: { en: 'Border radius' },
            type: 'Length',
            section: 'style',
            options: {
                unitChoices: [
                    { value: 'px', label: 'px', min: 0, max: 100 },
                    { value: '%', label: '%', min: 0, max: 50 },
                ],
            },
            defaultValue: '4px',
            classes: true,
            states: true,
            responsive: true,
            bindable: true,
        },
        actionButtonMargin: {
            label: { en: 'Margin' },
            type: 'Spacing',
            section: 'style',
            defaultValue: '0 0 0 4px',
            classes: true,
            states: true,
            responsive: true,
            bindable: true,
        },

        // ======== CIRCLE ANIMATION PROPERTIES ========
        circleAnimationTitle: {
            type: 'Title',
            label: { en: 'Drag & Drop Animation' },
            section: 'style',
        },
        enableCircleAnimation: {
            label: { en: 'Enable circle animation' },
            type: 'OnOff',
            section: 'style',
            defaultValue: true,
            bindable: true,
            /* wwEditor:start */
            bindingValidation: {
                type: 'boolean',
                tooltip:
                    'A boolean that defines if the circle animation during drag and drop is enabled: `true | false`',
            },
            /* wwEditor:end */
        },
        circleSize: {
            label: { en: 'Circle size' },
            type: 'Length',
            section: 'style',
            options: {
                unitChoices: [{ value: 'px', label: 'px', min: 20, max: 500 }],
            },
            defaultValue: '180px',
            hidden: content => !content.enableCircleAnimation,
            classes: true,
            states: true,
            responsive: true,
            bindable: true,
        },
        circleColor: {
            label: { en: 'Circle color' },
            type: 'Color',
            section: 'style',
            defaultValue: '#EEEEEE',
            hidden: content => !content.enableCircleAnimation,
            classes: true,
            states: true,
            responsive: true,
            /* wwEditor:start */
            bindingValidation: {
                type: 'string',
                tooltip: 'The color of the drag and drop circle. If not set, uses the progress bar color.',
            },
            /* wwEditor:end */
        },
        circleOpacity: {
            label: { en: 'Circle opacity' },
            type: 'Number',
            options: { min: 0, max: 1, step: 0.1 },
            section: 'style',
            defaultValue: 0.5,
            hidden: content => !content.enableCircleAnimation,
            classes: true,
            states: true,
            responsive: true,
            bindable: true,
        },
        animationSpeed: {
            label: { en: 'Animation speed' },
            type: 'Number',
            options: { min: 0.1, max: 2, step: 0.1 },
            section: 'style',
            defaultValue: 0.5, // Half speed by default
            hidden: content => !content.enableCircleAnimation,
            classes: true,
            states: true,
            responsive: true,
            bindable: true,
            /* wwEditor:start */
            bindingValidation: {
                type: 'number',
                tooltip:
                    'Controls the speed of the drag and drop animation (0.5 = half speed, 1 = normal, 2 = double speed)',
            },
            /* wwEditor:end */
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
            bindable: true,
            hidden: (content, sidePanelContent) => {
                return !sidePanelContent.form?.uid || !content.customValidation;
            },
        },
    },
};
