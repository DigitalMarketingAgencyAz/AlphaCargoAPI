import { CreateRequestDto } from './dto/create-request.dto';
import { RequestService } from './request.service';
export declare class RequestController {
    private requestService;
    constructor(requestService: RequestService);
    createRequest(createRequestDto: CreateRequestDto): Promise<{
        id: number;
        fullName: string;
        phoneNumber: string;
        pickupAddress: string;
        pickupTime: string;
        packageSize: string;
        packageCount: number;
        deliveryAddress: string;
    }>;
}
