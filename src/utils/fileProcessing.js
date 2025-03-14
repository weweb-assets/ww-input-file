import { getFileExtension } from './fileValidation';

/**
 * Get detailed information about a file
 * @param {File} file - The file to get details for
 * @returns {Object} File details including size, type, and extension
 */
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

/**
 * Process a file for export (Base64 or Binary)
 * @param {File} file - The file to process
 * @param {Object} options - Processing options
 * @param {boolean} [options.base64=false] - Whether to process as Base64
 * @param {boolean} [options.binary=false] - Whether to process as Binary
 * @returns {Promise<Object>} Object containing processed data
 */
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

/**
 * Convert a file to Base64 string
 * @param {File} file - The file to convert
 * @returns {Promise<string>} Base64-encoded string with MIME type prefix
 */
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

/**
 * Convert a file to binary data
 * @param {File} file - The file to convert
 * @returns {Promise<ArrayBuffer>} Binary data as ArrayBuffer
 */
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
