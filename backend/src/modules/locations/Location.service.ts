import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from '../categories/Category.entity';
import { CreateLocationDto, ChangeLocationPriceDto } from './Location.dto';
import { Location } from './Location.entity';

@Injectable()
export class LocationService {
  constructor(
    @InjectRepository(Location)
    private readonly locationRepository: Repository<Location>,

    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async getLocations() {
    return await this.locationRepository.find();
  }

  async getLocation(id: number) {
    return await this.locationRepository.findOne(id);
  }

  async createLocation(location: CreateLocationDto) {
    // Get category from provided name
    let category = await this.categoryRepository.findOne({
      where: { name: location.categoryName },
    });

    // Check if category exists and create it if not
    if (category === undefined) {
      category = await this.categoryRepository.save({
        name: location.categoryName,
        description: 'New Description',
      });
    }

    const totalLocations = await this.locationRepository.count();

    return await this.locationRepository.save({
      id: totalLocations + 1,
      title: location.title,
      description: location.description,
      location: location.location,
      picture: location.picture,
      stars: location.stars,
      numberOfRooms: location.numberOfRooms,
      price: location.price,
      categoryId: category.id,
    });
  }

  async changeLocationPrice(id: number, priceDto: ChangeLocationPriceDto) {
    return await this.locationRepository.update(id, { price: priceDto.price });
  }

  async deleteLocation(id: number) {
    return await this.locationRepository.delete(id);
  }
}
