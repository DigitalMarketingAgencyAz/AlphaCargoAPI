import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserReqDto } from '../users/dto/create-user.dto';
export declare class AuthService {
    private readonly usersService;
    private readonly jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    signIn(email: string, pass: string): Promise<{
        access_token: string;
        id: number;
        phone: string;
        fio: string;
    }>;
    signUp(payload: CreateUserReqDto): Promise<import("../users/dto/create-user.dto").CreateUserResDto>;
}
