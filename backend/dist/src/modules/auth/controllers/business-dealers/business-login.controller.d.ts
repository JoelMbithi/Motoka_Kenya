import { BusinessLoginService } from '../../services/business-dealers/business-login.service';
import { BusinessLoginDto } from '../../dtos/business-dealers/business-login.dto';
export declare class BusinessLoginController {
    private readonly businessLoginService;
    constructor(businessLoginService: BusinessLoginService);
    login(loginDto: BusinessLoginDto): Promise<{
        success: boolean;
        accessToken: string;
        refreshToken: string | undefined;
        user: {
            id: string;
            name: string;
            email: string;
            phone: string;
            role: string;
        };
        business: {
            id: string;
            businessName: string;
            businessType: string;
            status: string;
        } | undefined;
    }>;
}
