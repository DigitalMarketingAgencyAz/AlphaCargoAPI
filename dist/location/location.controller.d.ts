import { CountriesService } from './country.service';
import { CitiesService } from './city.service';
import { CityDto, CountryDto } from './dto/location.dto';
export declare class LocationController {
    private readonly countriesService;
    private readonly citiesService;
    constructor(countriesService: CountriesService, citiesService: CitiesService);
    getAllCountries(): Promise<{
        id: number;
        countryname: string;
    }[]>;
    getCountryById(countryId: number): Promise<CountryDto>;
    getAllCities(): Promise<{
        id: number;
        cityname: string;
        countryId: number;
        type: import(".prisma/client").$Enums.City_Type;
    }[]>;
    getCityById(cityId: number): Promise<CityDto>;
}
