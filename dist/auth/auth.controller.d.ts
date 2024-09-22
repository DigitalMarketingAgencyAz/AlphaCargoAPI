import { AuthService } from './auth.service';
import { CreateUserResDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { LoginResDto } from '../users/dto/base-user.dto';
export declare class AuthController {
    private authService;
    private usersService;
    constructor(authService: AuthService, usersService: UsersService);
    login(loginDto: {
        phone: string;
        password: string;
    }): Promise<LoginResDto>;
    signUpStep1(signUpDto: {
        phone: string;
    }): Promise<void>;
    signUpStep2(signUpDto: {
        phone: string;
        password: string;
        code: string;
    }): Promise<CreateUserResDto>;
}
