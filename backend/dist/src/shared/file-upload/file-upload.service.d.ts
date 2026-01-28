export declare class FileUploadService {
    private readonly uploadDir;
    constructor();
    getMulterConfig(): {
        storage: import("multer").StorageEngine;
        fileFilter: (req: any, file: any, callback: any) => any;
        limits: {
            fileSize: number;
        };
    };
    getFileUrl(filename: string): string;
    deleteFile(filename: string): boolean;
}
