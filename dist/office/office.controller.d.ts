import { OfficeService } from './office.service';
import { OfficeDto } from './dto/office.dto';
export declare class OfficeController {
    private readonly officeService;
    constructor(officeService: OfficeService);
    getAllOffices(): Promise<OfficeDto[]>;
    getOfficeById(id: number): Promise<OfficeDto>;
}
