---
name: ww-file-upload
description: A feature-rich file upload component with drag-and-drop support, file validation, and extensive customization options
keywords: file upload, drag and drop, multiple files, file validation, file preview, file list
---

#### File Upload Component

Properties:

-   `type`: `'single' | 'multi'` - Sets the upload mode to single or multiple files. Default: `'single'`
-   `reorder`: `boolean` - Allows reordering of files in multi-file mode. Default: `false`
-   `drop`: `boolean` - Enables drag and drop functionality. Default: `true`
-   `maxFileSize`: `number` - Maximum file size in MB. Default: `10`
-   `minFileSize`: `number` - Minimum file size in MB. Default: `0`
-   `maxTotalFileSize`: `number` - Maximum total size for all files in MB. Default: `50`
-   `maxFiles`: `number` - Maximum number of files allowed in multi-file mode. Default: `10`
-   `showFileInfo`: `boolean` - Shows file information (size, type). Default: `true`
-   `required`: `boolean` - Makes the file upload field required. Default: `false`
-   `readonly`: `boolean` - Makes the component read-only. Default: `false`
-   `extensions`: `'any' | 'image' | 'video' | 'audio' | 'pdf' | 'csv' | 'excel' | 'word' | 'json' | 'custom'` - Allowed file types. Default: `'any'`
-   `customExtensions`: `string` - Comma-separated list of allowed file extensions when using custom extensions. Default: `''`
-   `exposeBase64`: `boolean` - Exposes file content as Base64 data. Default: `false`
-   `exposeBinary`: `boolean` - Exposes file content as binary data. Default: `false`
-   `alwaysShowUploadArea`: `boolean` - Always shows the upload area even when files are selected. Default: `true`
-   `showUploadIcon`: `boolean` - Shows the upload icon. Default: `true`
-   `uploadIcon`: `string` - Icon to use for upload. Default: `'upload'`
-   `uploadIconPosition`: `'top' | 'right' | 'bottom' | 'left'` - Position of the upload icon. Default: `'top'`
-   `labelMessage`: `string` - Text label for the upload area. Default: `'Drop files here or click to upload'`
-   `extensionsMessage`: `string` - Message showing allowed extensions. Default: `'Allowed file types: {extensions}'`
-   `maxFileMessage`: `string` - Message showing maximum file size. Default: `'Max file size: {maxFileSize} MB'`

Style Properties:

-   `dropzoneBorderColor`: `string` - Border color for the dropzone. Default: `'#CCCCCC'`
-   `dropzoneBorderStyle`: `'solid' | 'dashed' | 'dotted' | 'none'` - Border style for the dropzone. Default: `'dashed'`
-   `dropzoneBorderWidth`: `string` - Border width for the dropzone. Default: `'2px'`
-   `dropzoneBorderRadius`: `string` - Border radius for the dropzone. Default: `'8px'`
-   `dropzoneBackground`: `string` - Background color for the dropzone. Default: `'rgba(0, 0, 0, 0.01)'`
-   `dropzonePadding`: `string` - Padding for the dropzone. Default: `'20px'`
-   `dropzoneMinHeight`: `string` - Minimum height for the dropzone. Default: `'120px'`
-   `uploadIconColor`: `string` - Color for the upload icon. Default: `'#666666'`
-   `uploadIconSize`: `string` - Size for the upload icon. Default: `'24px'`
-   `uploadIconMargin`: `string` - Margin for the upload icon. Default: `'8px'`
-   `labelFontFamily`: `string` - Font family for the label. Default: `'inherit'`
-   `labelFontSize`: `string` - Font size for the label. Default: `'16px'`
-   `labelFontWeight`: `string` - Font weight for the label. Default: `'normal'`
-   `labelColor`: `string` - Color for the label. Default: `'#333333'`
-   `labelMargin`: `string` - Margin for the label. Default: `'0 0 4px 0'`
-   `extensionsMessageFontFamily`: `string` - Font family for extensions message. Default: `'inherit'`
-   `extensionsMessageFontSize`: `string` - Font size for extensions message. Default: `'12px'`
-   `extensionsMessageFontWeight`: `string` - Font weight for extensions message. Default: `400`
-   `extensionsMessageColor`: `string` - Color for extensions message. Default: `'#888888'`
-   `extensionsMessageMargin`: `string` - Margin for extensions message. Default: `'0 0 4px 0'`
-   `maxFileMessageFontFamily`: `string` - Font family for max file message. Default: `'inherit'`
-   `maxFileMessageFontSize`: `string` - Font size for max file message. Default: `'12px'`
-   `maxFileMessageFontWeight`: `string` - Font weight for max file message. Default: `400`
-   `maxFileMessageColor`: `string` - Color for max file message. Default: `'#888888'`
-   `maxFileMessageMargin`: `string` - Margin for max file message. Default: `'0 0 4px 0'`
-   `fileItemBackground`: `string` - Background color for file items. Default: `'#FFFFFF'`
-   `fileItemBorderColor`: `string` - Border color for file items. Default: `'#EEEEEE'`
-   `fileItemBorderRadius`: `string` - Border radius for file items. Default: `'6px'`
-   `fileItemPadding`: `string` - Padding for file items. Default: `'12px'`
-   `fileItemMargin`: `string` - Margin for file items. Default: `'0 0 8px 0'`
-   `fileItemShadow`: `string` - Shadow for file items. Default: `'0 2px 4px rgba(0, 0, 0, 0.05)'`
-   `fileItemHoverBorderColor`: `string` - Border color for file items on hover. Default: `'#DDDDDD'`
-   `fileItemHoverBackground`: `string` - Background color for file items on hover. Default: `'#FFFFFF'`
-   `fileItemHoverShadow`: `string` - Shadow for file items on hover. Default: `'0 2px 4px rgba(0, 0, 0, 0.05)'`
-   `fileNameFontFamily`: `string` - Font family for file names. Default: `'inherit'`
-   `fileNameFontSize`: `string` - Font size for file names. Default: `'14px'`
-   `fileNameFontWeight`: `string` - Font weight for file names. Default: `500`
-   `fileNameColor`: `string` - Color for file names. Default: `'#333333'`
-   `fileDetailsFontFamily`: `string` - Font family for file details. Default: `'inherit'`
-   `fileDetailsFontSize`: `string` - Font size for file details. Default: `'12px'`
-   `fileDetailsFontWeight`: `string` - Font weight for file details. Default: `'normal'`
-   `fileDetailsColor`: `string` - Color for file details. Default: `'#888888'`
-   `actionButtonSize`: `string` - Size for action buttons. Default: `'28px'`
-   `actionButtonBackground`: `string` - Background color for action buttons. Default: `'#FFFFFF'`
-   `actionButtonHoverBackground`: `string` - Background color for action buttons on hover. Default: `'#F8F8F8'`
-   `actionButtonColor`: `string` - Color for action buttons. Default: `'#666666'`
-   `actionButtonBorderColor`: `string` - Border color for action buttons. Default: `'#EEEEEE'`
-   `actionButtonHoverBorderColor`: `string` - Border color for action buttons on hover. Default: `'#DDDDDD'`
-   `actionButtonRemoveHoverColor`: `string` - Color for remove button on hover. Default: `'#999999'`
-   `actionButtonBorderRadius`: `string` - Border radius for action buttons. Default: `'4px'`
-   `actionButtonMargin`: `string` - Margin for action buttons. Default: `'0 0 0 4px'`

Animation Properties:

-   `enableCircleAnimation`: `boolean` - Enables circle animation during drag and drop. Default: `true`
-   `circleSize`: `string` - Size of the animation circle. Default: `'180px'`
-   `circleColor`: `string` - Color of the animation circle. Default: `'#EEEEEE'`
-   `circleOpacity`: `number` - Opacity of the animation circle. Default: `0.5`
-   `animationSpeed`: `number` - Speed of the animation. Default: `0.5`

Events:

-   `change`: {value: fileArray} - Triggered when files are added or removed
-   `initValueChange`: {value: fileArray} - Triggered when initial value changes
-   `error`: {code: errorCode, data: errorData} - Triggered when file validation fails

Actions:

-   `clearFiles`: Clears all files from the component
-   `startUploading`: Starts the upload process for all files
-   `updateProgress`: Updates the progress of a specific file's upload
-   `updateUploadStatus`: Updates the upload status of a specific file

Variables:

-   `value`: array - Array of file objects with properties:
    -   `name`: string - File name
    -   `size`: number - File size in MB
    -   `type`: string - MIME type of the file
    -   `extension`: string - File extension
    -   `lastModified`: number - Last modified timestamp
    -   `uploadProgress`: number - Upload progress (0-100)
    -   `isUploading`: boolean - Whether the file is currently uploading
    -   `isUploaded`: boolean - Whether the file has been uploaded
    -   `base64`: string - Base64 representation of the file (if exposeBase64 is true)
    -   `binary`: ArrayBuffer - Binary representation of the file (if exposeBinary is true)
    -   `id`: string - Unique ID for the file (for stable transitions)

Special features:

-   Interactive drag-and-drop with fluid animation effect
-   Customizable circle animation during drag and drop operations
-   Visual feedback during file upload with progress indicator
-   File type filtering with multiple preset options
-   File size validation with configurable minimum and maximum limits
-   Total file size limit for multiple file uploads
-   Comprehensive styling options for all component parts
-   Support for reordering files in multi-file mode
-   Ability to expose file contents as Base64 or binary data
-   Responsive design that adapts to container size
-   Accessibility support with ARIA attributes
-   Support for single and multiple file upload modes
-   Custom styling for hover and active states
-   Detailed file information display
-   Control over animation speed and appearance
