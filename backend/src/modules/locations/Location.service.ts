import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CreateLocationDto,
  UpdateLocationDto,
  ChangeLocationPriceDto,
} from './Location.dto';
import { Location } from './Location.entity';

@Injectable()
export class LocationService {
  constructor(
    @InjectRepository(Location)
    private readonly locationRepository: Repository<Location>,
  ) {}

  async getLocations() {
    return await this.locationRepository.find();
  }

  async getLocation(id: number) {
    return await this.locationRepository.findOne(id);
  }

  async createLocation(location: CreateLocationDto) {
    const newLocation = new Location();
    newLocation.title = location.title;
    newLocation.description = location.description;
    newLocation.location = location.location;
    newLocation.picture = location.picture;
    newLocation.price = location.price;
    newLocation.stars = location.stars;
    newLocation.numberOfRooms = location.numberOfRooms;
    newLocation.categoryId = location.categoryId;

    return await this.locationRepository.create(newLocation);
  }

  async updateLocation(id: number, location: UpdateLocationDto) {
    return await this.locationRepository.update(id, location);
  }

  async changeLocationPrice(id: number, priceDto: ChangeLocationPriceDto) {
    return await this.locationRepository.update(id, { price: priceDto.price });
  }

  async deleteLocation(id: number) {
    return await this.locationRepository.delete(id);
  }
}
