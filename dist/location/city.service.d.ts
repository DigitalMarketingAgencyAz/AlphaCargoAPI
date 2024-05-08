import { PrismaService } from '../prisma/prisma.service';
import { City } from '@prisma/client';
export declare class CitiesService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<City[]>;
    findOneById(id: number): Promise<City | null>;
}
