import { PrismaService } from '../prisma/prisma.service';
import { CreateRequestDto } from './dto/create-request.dto';
export declare class RequestService {
    private prisma;
    constructor(prisma: PrismaService);
    createRequest(data: CreateRequestDto): Promise<{
        id: number;
        fullName: string;
        phoneNumber: string;
        pickupAddress: string;
        pickupTime: string;
        packageSize: string;
        packageCount: number;
        deliveryAddress: string;
    }>;
    getRequestById(id: number): Promise<{
        id: number;
        fullName: string;
        phoneNumber: string;
        pickupAddress: string;
        pickupTime: string;
        packageSize: string;
        packageCount: number;
        deliveryAddress: string;
    }>;
    private parseDateString;
}
