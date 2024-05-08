import { ParcelsService } from './parcels.service';
import { GetParcelDto } from './dto/base-parcel-dto';
export declare class ParcelsController {
    private parcelsService;
    constructor(parcelsService: ParcelsService);
    findAll(): Promise<GetParcelDto[]>;
    findOne(id: number): Promise<GetParcelDto>;
    findByTrackingNumber(trackingNumber: string): Promise<GetParcelDto>;
}
