export const validateFile = (file: File, maxSizeMB = 10): string | null => {
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

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};