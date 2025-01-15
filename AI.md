---
name: ww-input-file
description: The ww-input-file component enables users to upload various file types through a customizable interface, supporting multiple file selection, file type restrictions, and integration with ww-button and ww-text components for enhanced functionality.
keywords:
  - file upload
  - multiple files
  - file type restriction
  - custom file extensions
  - ww-button integration
  - ww-text integration
  - change event
  - initvaluechange event
  - read-only input
  - required file upload
---

#### ww-input-file

File upload component supporting various file types with customizable interface.

Properties:
- multiple: boolean - Allow multiple file uploads. Default: false
- required: boolean - Make file upload required. Default: true
- readonly: boolean - Make input read-only. Default: false
- accept: 'any' | 'image' | 'video' | 'audio' | 'pdf' | 'csv' | 'xls' | 'doc' | 'json' | 'custom' - Allowed file types. Default: 'any'
- acceptCustom: string - Custom file extensions when accept is 'custom'. Default: ''

Children:
- text: ww-text - Text component for input field
- button: ww-button - Button component for file explorer

Events:
- change: Triggered when file selection changes
  Payload: { domEvent: Event, value: File|FileList }
- initValueChange: Triggered when initial value changes
  Payload: { value: File|FileList }

Variables:
- value: File|FileList - Selected file(s)
- progress: number - Upload progress (0-100)

Example:
<elements>
{"uid":0,"tag":"ww-input-file","name":"File Input","props":{"default":{"required":true,"accept":"any","fieldName":"uploadedFile","multiple":false,"readonly":false,"acceptCustom":""}},"styles":{"default":{"width":"100%","margin":"0 auto","padding":"24px","maxWidth":"480px","borderRadius":"8px","backgroundColor":"#f8fafc","border":"2px dashed #cbd5e1"}},"children":{"button":{"uid":1},"text":{"uid":2}}}
{"uid":1,"tag":"ww-button","states":[{"id":"_wwHover","label":"hover"}],"props":{"default":{"buttonType":"button","disabled":false,"text":{"en":"Choose a file"}}},"styles":{"default":{"padding":"12px 24px","cursor":"pointer","borderRadius":"6px","backgroundColor":"#3b82f6","transition":"all 0.2s ease","color":"#ffffff","fontSize":"14px","fontWeight":"500"},"_wwHover_default":{"backgroundColor":"#2563eb"}}}
{"uid":2,"tag":"ww-text","props":{"default":{"tag":"p","text":{"en":"Drag and drop your file here or click to browse"}}},"styles":{"default":{"margin":"0px 0 0 8px","fontSize":"14px","textAlign":"center","color":"#64748b"}}}
</elements>
