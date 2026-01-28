import { BusinessRegisterService } from '../../services/business-dealers/business-register.service';
import { BusinessRegisterDto } from '../../dtos/business-dealers/business-register.dto';
export declare class BusinessRegisterController {
    private readonly businessRegisterService;
    private readonly logger;
    constructor(businessRegisterService: BusinessRegisterService);
    register(businessRegisterDto: BusinessRegisterDto): Promise<{
        success: boolean;
        message: string;
        data: any;
    }>;
}
