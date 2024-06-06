import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserReqDto } from '../users/dto/create-user.dto';
import { LoginResDto } from '../users/dto/base-user.dto';
export declare class AuthService {
    private readonly usersService;
    private readonly jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    signIn(phone: string, pass: string): Promise<LoginResDto>;
    signInByPhone(phone: string): Promise<LoginResDto>;
    signUp(payload: CreateUserReqDto & {
        code: string;
    }): Promise<import("../users/dto/create-user.dto").CreateUserResDto>;
    signUpStep1(phone: string): Promise<void>;
    signUpStep2(payload: CreateUserReqDto & {
        code: string;
    }): Promise<import("../users/dto/create-user.dto").CreateUserResDto>;
}
