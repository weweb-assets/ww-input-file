/**
 * Validates a file against specified constraints
 * @param {File} file - The file to validate
 * @param {Object} options - Validation options
 * @param {number} [options.maxFileSize] - Maximum file size in MB
 * @param {number} [options.minFileSize] - Minimum file size in MB
 * @param {number} [options.maxTotalFileSize] - Maximum total size of all files in MB
 * @param {number} [options.currentTotalSize] - Current total size of all files in MB
 * @param {string} [options.acceptedTypes] - Accepted file types string (e.g. '.jpg,.png,image/*')
 * @returns {Object} Validation result with valid boolean and reason string if invalid
 */
export function validateFile(file, options = {}) {
    const { maxFileSize, minFileSize, maxTotalFileSize, currentTotalSize = 0, acceptedTypes = '' } = options;

    // Convert file size from bytes to MB for comparison
    const fileSizeInMB = file.size / (1024 * 1024);

    // Check min file size
    if (minFileSize && fileSizeInMB < minFileSize) {
        return {
            valid: false,
            reason: `File size (${fileSizeInMB.toFixed(
                2
            )} MB) is less than the minimum allowed size (${minFileSize} MB)`,
            constraint: 'MIN_SIZE',
            details: {
                minSize: minFileSize,
                actualSize: fileSizeInMB,
            },
        };
    }

    // Check max file size
    if (maxFileSize && fileSizeInMB > maxFileSize) {
        return {
            valid: false,
            reason: `File size (${fileSizeInMB.toFixed(2)} MB) exceeds the maximum allowed size (${maxFileSize} MB)`,
            constraint: 'MAX_SIZE',
            details: {
                maxSize: maxFileSize,
                actualSize: fileSizeInMB,
            },
        };
    }

    // Check total file size
    if (maxTotalFileSize && currentTotalSize + fileSizeInMB > maxTotalFileSize) {
        return {
            valid: false,
            reason: `Total file size (${(currentTotalSize + fileSizeInMB).toFixed(
                2
            )} MB) would exceed the maximum allowed (${maxTotalFileSize} MB)`,
            constraint: 'MAX_TOTAL_SIZE',
            details: {
                maxTotalSize: maxTotalFileSize,
                currentTotalSize: currentTotalSize,
                newFileSize: fileSizeInMB,
                resultingTotalSize: currentTotalSize + fileSizeInMB,
            },
        };
    }

    // Check file type
    if (acceptedTypes && !isFileTypeAccepted(file, acceptedTypes)) {
        return {
            valid: false,
            reason: `File type "${file.type}" is not accepted. Allowed types: ${acceptedTypes}`,
            constraint: 'INVALID_TYPE',
            details: {
                allowedTypes: acceptedTypes,
                fileType: file.type,
                fileExtension: getFileExtension(file.name, file.type),
            },
        };
    }

    return { valid: true };
}

/**
 * Checks if a file's type is in the accepted types string
 * @param {File} file - The file to check
 * @param {string} acceptedTypes - Comma-separated list of accepted file types
 * @returns {boolean} Whether the file type is accepted
 */
function isFileTypeAccepted(file, acceptedTypes) {
    if (!acceptedTypes) return true;

    // No file or no file type means we can't validate
    if (!file || !file.type) return false;

    const acceptedTypesArray = acceptedTypes.split(',').map(type => type.trim().toLowerCase());

    // Check for wildcards like "image/*"
    const typeCategory = file.type.split('/')[0] + '/*';
    if (acceptedTypesArray.includes(typeCategory)) {
        return true;
    }

    // Check for specific MIME type
    if (acceptedTypesArray.includes(file.type.toLowerCase())) {
        return true;
    }

    // Check for file extension
    const extension = '.' + file.name.split('.').pop().toLowerCase();
    return acceptedTypesArray.includes(extension);
}

/**
 * Gets file extension from filename or MIME type
 * @param {string} filename - The filename to parse
 * @param {string} [mimeType] - Optional MIME type as fallback
 * @returns {string} The file extension without dot
 */
export function getFileExtension(filename, mimeType) {
    if (filename && filename.includes('.')) {
        return filename.split('.').pop().toLowerCase();
    }

    if (mimeType) {
        // Extract extension from MIME type if possible
        const mimeExtensions = {
            'image/jpeg': 'jpg',
            'image/png': 'png',
            'image/gif': 'gif',
            'image/webp': 'webp',
            'application/pdf': 'pdf',
            'text/csv': 'csv',
            'application/vnd.ms-excel': 'xls',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'xlsx',
            'application/msword': 'doc',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'docx',
            'application/json': 'json',
            'text/plain': 'txt',
        };

        return mimeExtensions[mimeType] || mimeType.split('/').pop();
    }

    return '';
}
