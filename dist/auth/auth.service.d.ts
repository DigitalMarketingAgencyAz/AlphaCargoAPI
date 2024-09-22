import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginResDto } from '../users/dto/base-user.dto';
export declare class AuthService {
    private readonly usersService;
    private readonly jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    signIn(phone: string, pass: string): Promise<LoginResDto>;
    signUp(payload: {
        phone: string;
        password: string;
        code: string;
    }): Promise<{
        id: number;
        phone: string;
    }>;
}
