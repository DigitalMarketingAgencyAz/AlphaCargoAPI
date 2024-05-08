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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FranchiseController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const franchise_service_1 = require("./franchise.service");
const create_franchise_dto_1 = require("./dto/create-franchise.dto");
const public_strategy_1 = require("../auth/public-strategy");
let FranchiseController = class FranchiseController {
    franchiseService;
    constructor(franchiseService) {
        this.franchiseService = franchiseService;
    }
    async createFranchise(createFranchiseDto) {
        return this.franchiseService.create(createFranchiseDto);
    }
};
exports.FranchiseController = FranchiseController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Создать новую франшизу' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Франшиза успешно создана' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_franchise_dto_1.CreateFranchiseDto]),
    __metadata("design:returntype", Promise)
], FranchiseController.prototype, "createFranchise", null);
exports.FranchiseController = FranchiseController = __decorate([
    (0, common_1.Controller)('franchise'),
    (0, swagger_1.ApiTags)('franchise'),
    (0, public_strategy_1.Public)(),
    __metadata("design:paramtypes", [franchise_service_1.FranchiseService])
], FranchiseController);
//# sourceMappingURL=franchise.controller.js.map