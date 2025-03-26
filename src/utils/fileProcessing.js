import { getFileExtension } from './fileValidation';

export async function getFileDetails(file) {
    const extension = getFileExtension(file.name, file.type);

    return {
        name: file.name,
        size: file.size,
        type: file.type,
        extension,
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
        reader.onload = () => resolve(reader.result);
        reader.onerror = () => reject(new Error('Failed to convert file to Base64'));
        reader.readAsDataURL(file);
    });
}

export function fileToBinary(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = () => reject(new Error('Failed to convert file to binary'));
        reader.readAsArrayBuffer(file);
    });
}
