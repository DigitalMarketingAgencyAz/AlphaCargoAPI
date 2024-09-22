import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';
import { UpdateUserReqDto, UpdateUserResDto } from './dto/update-user.dto';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    createVerificationCode(phone: string): Promise<void>;
    sendSmsVerification(phone: string, code: string): Promise<void>;
    findLastVerificationRequest(phone: string): Promise<any>;
    findOneByPhone(phone: string): Promise<User | null>;
    update(id: number, updateUserDto: UpdateUserReqDto): Promise<UpdateUserResDto>;
    findOneById(id: number): Promise<Omit<User, 'password' | 'isActive'>>;
    verifyCode(phone: string, code: string): Promise<boolean>;
    createUserAfterVerification(createUserDto: {
        phone: string;
        password: string;
    }): Promise<{
        id: number;
        phone: string;
    }>;
    deleteVerificationCode(phone: string, code: string): Promise<void>;
    deactivateUser(userId: number): Promise<void>;
}
