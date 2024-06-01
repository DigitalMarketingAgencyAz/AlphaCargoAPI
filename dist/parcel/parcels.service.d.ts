/// <reference types="node" />
import { PrismaService } from 'src/prisma/prisma.service';
import { GetParcelDto } from './dto/base-parcel-dto';
export declare class ParcelsService {
    private prisma;
    constructor(prisma: PrismaService);
    private getCurrentDate;
    findAll(PhoneNumber: string): Promise<GetParcelDto[]>;
    findOneByInvoiceNumber(InvoiceNumber: string): Promise<GetParcelDto>;
    getInvoicePdf(invoiceNumber: string): Promise<Buffer>;
}
