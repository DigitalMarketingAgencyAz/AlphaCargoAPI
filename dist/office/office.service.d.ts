import { PrismaService } from '../prisma/prisma.service';
import { Office } from '@prisma/client';
export declare class OfficeService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<Office[]>;
    findOneById(id: number): Promise<Office | null>;
}
