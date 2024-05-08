import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  NotFoundException,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags, ApiParam } from '@nestjs/swagger';
import { CountriesService } from './country.service';
import { CitiesService } from './city.service';
import { CityDto, CountryDto } from './dto/location.dto';
import { Public } from '../auth/public-strategy';

@Controller('locations')
@ApiTags('locations')
@Public()
export class LocationController {
  constructor(
    private readonly countriesService: CountriesService,
    private readonly citiesService: CitiesService,
  ) {}

  @Get('countries')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get all countries' })
  @ApiResponse({
    status: 200,
    description: 'All countries retrieved',
    type: [CountryDto],
  })
  async getAllCountries() {
    const countries = await this.countriesService.findAll();
    if (!countries || countries.length === 0) {
      throw new NotFoundException('Countries not found');
    }
    return countries;
  }

  @Get('countries/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get country by ID' })
  @ApiParam({
    name: 'id',
    description: 'Country ID',
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: 'Country data retrieved',
    type: CountryDto,
  })
  async getCountryById(
    @Param('id', ParseIntPipe) countryId: number,
  ): Promise<CountryDto> {
    const country = await this.countriesService.findOneById(countryId);

    if (!country) {
      throw new NotFoundException(`Country with ID ${countryId} not found`);
    }

    return country;
  }

  @Get('cities')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get all cities' })
  @ApiResponse({
    status: 200,
    description: 'All cities retrieved',
    type: [CityDto],
  })
  async getAllCities() {
    const cities = await this.citiesService.findAll();
    if (!cities || cities.length === 0) {
      throw new NotFoundException('Cities not found');
    }
    return cities;
  }

  @Get('cities/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get city by ID' })
  @ApiParam({
    name: 'id',
    description: 'City ID',
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: 'City data retrieved',
    type: CityDto,
  })
  async getCityById(
    @Param('id', ParseIntPipe) cityId: number,
  ): Promise<CityDto> {
    const city = await this.citiesService.findOneById(cityId);

    if (!city) {
      throw new NotFoundException(`City with ID ${cityId} not found`);
    }

    return city;
  }
}
