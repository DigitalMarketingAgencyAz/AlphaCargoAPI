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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParcelsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const axios_1 = __importDefault(require("axios"));
const constants_1 = require("./constants");
let ParcelsService = class ParcelsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    getCurrentDate() {
        const currentDate = new Date();
        const formatDate = (date) => {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            return `${year}${month}${day}000000`;
        };
        const DateEnd = formatDate(currentDate);
        const DateStart = formatDate(new Date(currentDate.setFullYear(currentDate.getFullYear() - 1)));
        return { DateEnd, DateStart };
    }
    async findAll(PhoneNumber) {
        const { DateEnd, DateStart } = this.getCurrentDate();
        const options = {
            method: 'POST',
            url: 'http://212.2.231.34/test/hs/shipment_history',
            headers: {
                'Content-Type': 'application/json',
                Authorization: constants_1.authorization,
            },
            data: {
                PhoneNumber,
                DateStart,
                DateEnd,
            },
        };
        try {
            const { data } = await axios_1.default.request(options);
            return data;
        }
        catch (error) {
            console.log(error);
            throw new common_1.NotFoundException();
        }
    }
    async findOneByInvoiceNumber(InvoiceNumber) {
        const options = {
            method: 'POST',
            url: 'http://212.2.231.34/test/hs/shipment_status',
            headers: {
                'Content-Type': 'application/json',
                Authorization: constants_1.authorization,
            },
            data: {
                InvoiceNumber,
            },
        };
        try {
            const { data } = await axios_1.default.request(options);
            return data;
        }
        catch (error) {
            console.log(error);
            throw new common_1.NotFoundException();
        }
    }
    async getInvoicePdf(invoiceNumber) {
        const options = {
            method: 'POST',
            url: 'http://212.2.231.34/test/hs/get_pdf',
            headers: {
                'Content-Type': 'application/json',
                Authorization: constants_1.authorization,
            },
            data: {
                InvoiceNumber: invoiceNumber,
            },
        };
        try {
            const { data } = await axios_1.default.request(options);
            if (!data || !data.pdf) {
                throw new common_1.NotFoundException('PDF не найден');
            }
            const pdfBuffer = data.pdf;
            return pdfBuffer;
        }
        catch (error) {
            console.error(error);
            throw new common_1.NotFoundException('PDF не найден');
        }
    }
};
exports.ParcelsService = ParcelsService;
exports.ParcelsService = ParcelsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ParcelsService);
//# sourceMappingURL=parcels.service.js.map