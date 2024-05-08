import { PrismaService } from 'src/prisma/prisma.service';
import { GetParcelDto } from './dto/base-parcel-dto';
export declare class ParcelsService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<GetParcelDto[]>;
    findOne(id: number): Promise<GetParcelDto | null>;
    findByTrackingNumber(trackingNumber: string): Promise<GetParcelDto>;
}
