import { PrismaService } from '../prisma/prisma.service';
import { Service } from '@prisma/client';
export declare class ServiceService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getAllServices(): Promise<Service[]>;
    getServiceById(id: number): Promise<Service | null>;
}
