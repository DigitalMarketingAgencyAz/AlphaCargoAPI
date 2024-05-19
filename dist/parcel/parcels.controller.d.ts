import { ParcelsService } from './parcels.service';
import { GetParcelDto } from './dto/base-parcel-dto';
import { GetParcelStatusDto } from './dto/base-parcel-status.dto';
export declare class ParcelsController {
    private parcelsService;
    constructor(parcelsService: ParcelsService);
    findAll(request: any): Promise<GetParcelDto[]>;
    findOne(invoiceNumber: string): Promise<GetParcelStatusDto>;
}
