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

function isFileTypeAccepted(file, acceptedTypes) {
    if (!acceptedTypes) return true;

    if (!file || !file.type) return false;

    const acceptedTypesArray = acceptedTypes.split(',').map(type => type.trim().toLowerCase());

    const typeCategory = file.type.split('/')[0] + '/*';
    if (acceptedTypesArray.includes(typeCategory)) {
        return true;
    }

    if (acceptedTypesArray.includes(file.type.toLowerCase())) {
        return true;
    }

    const extension = '.' + file.name.split('.').pop().toLowerCase();
    return acceptedTypesArray.includes(extension);
}

export function getFileExtension(filename, mimeType) {
    if (filename && filename.includes('.')) {
        return filename.split('.').pop().toLowerCase();
    }

    if (mimeType) {
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
