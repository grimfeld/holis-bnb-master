import {
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
  Body,
} from '@nestjs/common';
import { LocationService } from './Location.service';
import { ChangeLocationPriceDto, CreateLocationDto } from './Location.dto';

@Controller('locations')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  /** List all locations in database with this endpoint */
  @Get()
  async getLocations() {
    return await this.locationService.getLocations();
  }

  /** Get a specific location in database with this endpoint */
  @Get(':id')
  async getLocation(@Param('id') id: number) {
    return await this.locationService.getLocation(id);
  }

  /** Create a new location in database with this endpoint */
  @Post()
  async createLocation(@Body() location: CreateLocationDto) {
    return await this.locationService.createLocation(location);
  }

  /** Change the price of a specific location in database with this endpoint */
  @Put(':id/price')
  async changeLocationPrice(
    @Param('id') id: number,
    @Body() priceDto: ChangeLocationPriceDto,
  ) {
    return await this.locationService.changeLocationPrice(id, priceDto);
  }

  /** Delete a specific location in database with this endpoint */
  @Delete(':id')
  async deleteLocation(@Param('id') id: number) {
    return await this.locationService.deleteLocation(id);
  }
}
