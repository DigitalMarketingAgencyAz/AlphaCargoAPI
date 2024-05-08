import { PrismaService } from '../prisma/prisma.service';
import { Country } from '@prisma/client';
export declare class CountriesService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<Country[]>;
    findOneById(id: number): Promise<Country | null>;
}
