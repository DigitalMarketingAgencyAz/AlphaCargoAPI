import { OnModuleInit } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
export declare class PrismaService extends PrismaClient<Prisma.PrismaClientOptions, Prisma.LogLevel> implements OnModuleInit {
    private readonly logger;
    constructor();
    onModuleInit(): Promise<void>;
    onModuleDestroy(): Promise<void>;
}
