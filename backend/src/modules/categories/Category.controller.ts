import { Controller, Get } from '@nestjs/common';
import { CategoryService } from './Category.service';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  /** List all categories in database with this endpoint */
  @Get()
  async getCategories() {
    return await this.categoryService.getCategories();
  }

  /** Get a specific category in database with this endpoint */
  @Get(':id')
  async getCategory(id: number) {
    return await this.categoryService.getCategory(id);
  }
}
