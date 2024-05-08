"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FranchiseModule = void 0;
const common_1 = require("@nestjs/common");
const franchise_service_1 = require("./franchise.service");
const prisma_service_1 = require("../prisma/prisma.service");
const franchise_controller_1 = require("./franchise.controller");
let FranchiseModule = class FranchiseModule {
};
exports.FranchiseModule = FranchiseModule;
exports.FranchiseModule = FranchiseModule = __decorate([
    (0, common_1.Module)({
        controllers: [franchise_controller_1.FranchiseController],
        providers: [franchise_service_1.FranchiseService, prisma_service_1.PrismaService],
    })
], FranchiseModule);
//# sourceMappingURL=franchise.module.js.map