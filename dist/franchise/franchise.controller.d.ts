import { FranchiseService } from './franchise.service';
import { CreateFranchiseDto } from './dto/create-franchise.dto';
export declare class FranchiseController {
    private readonly franchiseService;
    constructor(franchiseService: FranchiseService);
    createFranchise(createFranchiseDto: CreateFranchiseDto): Promise<{
        id: number;
        region: string;
        city: string;
        address: string;
        fio: string;
        birthDate: Date;
        phone: string;
        email: string;
        sourceInfo: string;
    }>;
}
