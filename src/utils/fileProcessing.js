import { getFileExtension } from './fileValidation';

export async function getFileDetails(file) {
    const extension = getFileExtension(file.name, file.type);
    const sizeInMB = file.size / (1024 * 1024);

    return {
        name: file.name,
        size: Number(sizeInMB.toFixed(2)),
        type: file.type,
        extension,
        lastModified: file.lastModified,
        uploadProgress: 0,
        isUploading: false,
        isUploaded: false,
    };
}

export async function processFileForExport(file, options = {}) {
    const { base64 = false, binary = false } = options;
    const result = {};

    if (base64) {
        result.base64 = await fileToBase64(file);
    }

    if (binary) {
        result.binary = await fileToBinary(file);
    }

    return result;
}

export function fileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = () => {
            resolve(reader.result);
        };

        reader.onerror = () => {
            reject(new Error('Failed to convert file to Base64'));
        };

        reader.readAsDataURL(file);
    });
}

export function fileToBinary(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = () => {
            resolve(reader.result);
        };

        reader.onerror = () => {
            reject(new Error('Failed to convert file to binary'));
        };

        reader.readAsArrayBuffer(file);
    });
}
