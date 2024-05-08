import { ServiceService } from './service.service';
import { ServiceDto } from './dto/service.dto';
export declare class ServiceController {
    private readonly serviceService;
    constructor(serviceService: ServiceService);
    getAllServices(): Promise<ServiceDto[]>;
    getServiceById(id: number): Promise<ServiceDto>;
}
