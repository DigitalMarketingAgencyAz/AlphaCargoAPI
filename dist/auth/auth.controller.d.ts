import { AuthService } from './auth.service';
import { LoginResDto } from '../users/dto/base-user.dto';
import { CreateUserReqDto, CreateUserResDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
export declare class AuthController {
    private authService;
    private usersService;
    constructor(authService: AuthService, usersService: UsersService);
    loginStep1(loginDto: {
        phone: string;
        password: string;
    }): Promise<void>;
    loginStep2(loginDto: {
        phone: string;
        code: string;
        password: string;
    }): Promise<LoginResDto>;
    signUpStep1(signUpDto: CreateUserReqDto): Promise<void>;
    signUpStep2(signUpDto: CreateUserReqDto & {
        code: string;
    }): Promise<CreateUserResDto>;
}
