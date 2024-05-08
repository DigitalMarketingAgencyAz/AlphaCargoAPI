import { UsersService } from './users.service';
import { BaseUserReq } from './dto/base-user.dto';
import { UpdateUserReqDto, UpdateUserResDto } from './dto/update-user.dto';
export declare class UserController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getUser(request: any): Promise<BaseUserReq>;
    updateUser(userId: number, request: any, updateUserReqDto: UpdateUserReqDto): Promise<UpdateUserResDto>;
    getUserParcels(request: any): Promise<{
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
}
