import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category} from './entities/category.entity';
import { CreateCategoryDto } from './dto/create-catagory.dto';
import { UpdateCatgoryDto } from './dto/update-catagory.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async createCategory(dto: CreateCategoryDto){
    const category = this.categoryRepository.create({
      name: dto.name,
      description: dto.description,
    });

    return await this.categoryRepository.save(category);
  }

  async findAllCategories(){
    return await this.categoryRepository.find({
      order: { createdAt: 'DESC' },
    });
  }


async updateCategory(id: number,dto:UpdateCatgoryDto,) {
  const category = await this.categoryRepository.findOne({
    where: { id },});
  if (!category) {
    throw new NotFoundException('Category not found');
  }
  Object.assign(category, dto);
  return await this.categoryRepository.save(category);
}

}
