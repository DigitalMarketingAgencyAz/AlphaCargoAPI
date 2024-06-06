import { PrismaService } from '../prisma/prisma.service';
import { Prisma, TGUsers, User } from '@prisma/client';
import { CreateUserResDto } from './dto/create-user.dto';
import { UpdateUserReqDto, UpdateUserResDto } from './dto/update-user.dto';
import { TgbotService } from 'src/tgbot/tgbot.service';
export declare class UsersService {
    private prisma;
    private tgbot;
    constructor(prisma: PrismaService, tgbot: TgbotService);
    findOneByPhone(phone: string): Promise<User | null>;
    findOneById(id: number): Promise<Omit<User, 'password'> | null>;
    update(id: number, updateUserDto: UpdateUserReqDto): Promise<UpdateUserResDto>;
    findOneByPhoneTG(phone: string): Promise<TGUsers | null>;
    createVerificationCode(phone: string): Promise<void>;
    sendVerificationCode(chat_id: number, code: string): Promise<void>;
    verifyCode(phone: string, code: string): Promise<boolean>;
    createUserAfterVerification(createUserDto: Prisma.UserCreateInput): Promise<CreateUserResDto>;
    findOneByEmail(email: string): Promise<User | null>;
}
