import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
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
    const category = await this.categoryRepository.findOne({
      where: { name: location.categoryName },
    });

    // Check if category exists and create it if not
    if (category === undefined) {
      const newCategory = new Category();
      newCategory.name = location.categoryName;
      newCategory.description = 'New Description';
      this.categoryRepository.create(newCategory);
    }

    // Create location instance and create a new entry in database
    const newLocation = new Location();
    newLocation.title = location.title;
    newLocation.description = location.description;
    newLocation.location = location.location;
    newLocation.picture = location.picture;
    newLocation.price = location.price;
    newLocation.stars = location.stars;
    newLocation.numberOfRooms = location.numberOfRooms;
    newLocation.categoryId = category.id;

    return this.locationRepository.create(newLocation);
  }

  async changeLocationPrice(id: number, priceDto: ChangeLocationPriceDto) {
    return await this.locationRepository.update(id, { price: priceDto.price });
  }

  async deleteLocation(id: number) {
    return await this.locationRepository.delete(id);
  }
}
