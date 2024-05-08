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
exports.LocationController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const country_service_1 = require("./country.service");
const city_service_1 = require("./city.service");
const location_dto_1 = require("./dto/location.dto");
const public_strategy_1 = require("../auth/public-strategy");
let LocationController = class LocationController {
    countriesService;
    citiesService;
    constructor(countriesService, citiesService) {
        this.countriesService = countriesService;
        this.citiesService = citiesService;
    }
    async getAllCountries() {
        const countries = await this.countriesService.findAll();
        if (!countries || countries.length === 0) {
            throw new common_1.NotFoundException('Countries not found');
        }
        return countries;
    }
    async getCountryById(countryId) {
        const country = await this.countriesService.findOneById(countryId);
        if (!country) {
            throw new common_1.NotFoundException(`Country with ID ${countryId} not found`);
        }
        return country;
    }
    async getAllCities() {
        const cities = await this.citiesService.findAll();
        if (!cities || cities.length === 0) {
            throw new common_1.NotFoundException('Cities not found');
        }
        return cities;
    }
    async getCityById(cityId) {
        const city = await this.citiesService.findOneById(cityId);
        if (!city) {
            throw new common_1.NotFoundException(`City with ID ${cityId} not found`);
        }
        return city;
    }
};
exports.LocationController = LocationController;
__decorate([
    (0, common_1.Get)('countries'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Get all countries' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'All countries retrieved',
        type: [location_dto_1.CountryDto],
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], LocationController.prototype, "getAllCountries", null);
__decorate([
    (0, common_1.Get)('countries/:id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Get country by ID' }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'Country ID',
        type: Number,
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Country data retrieved',
        type: location_dto_1.CountryDto,
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], LocationController.prototype, "getCountryById", null);
__decorate([
    (0, common_1.Get)('cities'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Get all cities' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'All cities retrieved',
        type: [location_dto_1.CityDto],
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], LocationController.prototype, "getAllCities", null);
__decorate([
    (0, common_1.Get)('cities/:id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Get city by ID' }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'City ID',
        type: Number,
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'City data retrieved',
        type: location_dto_1.CityDto,
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], LocationController.prototype, "getCityById", null);
exports.LocationController = LocationController = __decorate([
    (0, common_1.Controller)('locations'),
    (0, swagger_1.ApiTags)('locations'),
    (0, public_strategy_1.Public)(),
    __metadata("design:paramtypes", [country_service_1.CountriesService,
        city_service_1.CitiesService])
], LocationController);
//# sourceMappingURL=location.controller.js.map