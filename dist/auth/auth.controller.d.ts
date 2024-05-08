import { AuthService } from './auth.service';
import { LoginDto } from '../users/dto/base-user.dto';
import { CreateUserReqDto, CreateUserResDto } from '../users/dto/create-user.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signIn(signInDto: LoginDto): Promise<{
        access_token: string;
        id: number;
        phone: string;
        fio: string;
    }>;
    signUp(signUpDto: CreateUserReqDto): Promise<CreateUserResDto>;
}
