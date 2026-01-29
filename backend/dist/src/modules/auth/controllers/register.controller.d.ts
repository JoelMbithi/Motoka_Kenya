import { RegisterService } from '../services/register.service';
import { RegisterDto } from '../dtos/register.dto';
export declare class RegisterController {
    private readonly registerService;
    constructor(registerService: RegisterService);
    register(registerDto: RegisterDto): Promise<{
        message: string;
        user: {
            name: string;
            id: string;
            email: string;
            phone: string;
            createdAt: Date;
        };
    }>;
}
