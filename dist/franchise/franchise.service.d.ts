import { PrismaService } from '../prisma/prisma.service';
import { CreateFranchiseDto } from './dto/create-franchise.dto';
export declare class FranchiseService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    private validateAndConvertDate;
    create(createFranchiseDto: CreateFranchiseDto): Promise<{
        id: number;
        region: string;
        city: string;
        address: string;
        fio: string;
        birthDate: Date;
        phone: string;
        email: string;
        sourceInfo: string;
    }>;
}
