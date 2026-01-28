"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatFileSize = exports.validateFile = void 0;
const validateFile = (file, maxSizeMB = 10) => {
    const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];
    const maxSize = maxSizeMB * 1024 * 1024;
    if (!validTypes.includes(file.type)) {
        return 'File type not supported. Please upload PDF, JPG, or PNG files.';
    }
    if (file.size > maxSize) {
        return `File size exceeds ${maxSizeMB}MB limit.`;
    }
    return null;
};
exports.validateFile = validateFile;
const formatFileSize = (bytes) => {
    if (bytes === 0)
        return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};
exports.formatFileSize = formatFileSize;
//# sourceMappingURL=file-upload.js.map