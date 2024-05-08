import { PrismaService } from '../prisma/prisma.service';
import { Prisma, User } from '@prisma/client';
import { CreateUserResDto } from './dto/create-user.dto';
import { UpdateUserReqDto } from './dto/update-user.dto';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    getUserParcels(userId: number): Promise<{
        parcels: {
            id: number;
            sender: string;
            recipient: string;
            status: string;
            sendDate: Date;
            receiveDate: Date;
            invoiceNumber: string;
            deliveryCost: number;
            trackingNumber: string;
            weight: number;
            dimensions: string;
            contentDescription: string;
            userId: number;
            createdAt: Date;
            updatedAt: Date;
        }[];
    } & {
        id: number;
        email: string;
        password: string;
        phone: string;
        fio: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findOneByEmail(email: string): Promise<User | null>;
    findOneById(id: number): Promise<Omit<User, 'password'> | null>;
    findOneByPhone(phone: string): Promise<User | null>;
    update(id: number, updateUserDto: UpdateUserReqDto): Promise<CreateUserResDto>;
    create(createUserDto: Prisma.UserCreateInput): Promise<CreateUserResDto>;
}
