"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FranchiseService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let FranchiseService = class FranchiseService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    validateAndConvertDate(dateStr) {
        const date = new Date(dateStr);
        if (isNaN(date.getTime())) {
            throw new common_1.BadRequestException("Неправильный формат даты, ожидалось 'YYYY-MM-DD'");
        }
        return date.toISOString();
    }
    async create(createFranchiseDto) {
        const birthDate = this.validateAndConvertDate(createFranchiseDto.birthDate);
        console.log(birthDate);
        return this.prisma.franchise.create({
            data: {
                region: createFranchiseDto.region,
                city: createFranchiseDto.city,
                address: createFranchiseDto.address,
                fio: createFranchiseDto.fio,
                birthDate,
                phone: createFranchiseDto.phone,
                email: createFranchiseDto.email,
                sourceInfo: createFranchiseDto.sourceInfo,
            },
        });
    }
};
exports.FranchiseService = FranchiseService;
exports.FranchiseService = FranchiseService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], FranchiseService);
//# sourceMappingURL=franchise.service.js.map