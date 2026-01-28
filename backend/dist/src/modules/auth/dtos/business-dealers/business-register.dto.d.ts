export declare class BusinessRegisterDto {
    businessName: string;
    businessType: string;
    registrationNumber: string;
    kraPin: string;
    yearEstablished: number;
    contactPerson: string;
    email: string;
    phone: string;
    whatsapp?: string;
    website?: string;
    county: string;
    town: string;
    address: string;
    description: string;
    specialties?: string[];
    password?: string;
    confirmPassword?: string;
    agreeToTerms: boolean;
    agreeToVerification: boolean;
    profileImageUrl?: string;
    logoUrl?: string;
    coverImageUrl?: string;
    gallery?: string[];
    businessLicensePath?: string;
    kraDocumentPath?: string;
    idCopyPath?: string;
}
