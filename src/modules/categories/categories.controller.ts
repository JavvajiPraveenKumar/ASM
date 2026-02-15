import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CategoryService } from './categories.service';
import { CreateCategoryDto } from './dto/create-catagory.dto';
import { UpdateCatgoryDto } from './dto/update-catagory.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoryService) { }

  @Post('create')
  @ApiOperation({ summary: 'Create a new category' })
  @ApiBody({ type: CreateCategoryDto })
  @ApiResponse({ status: 201, description: 'Category created successfully' })

  async createCategory(
    @Body() createCategoryDto: CreateCategoryDto,
  ) {
    return await this.categoriesService.createCategory(createCategoryDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all categories' })
  @ApiResponse({ status: 200, description: 'Categories fetched successfully' })
  async findAllCategories() {
    return await this.categoriesService.findAllCategories();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get category by id' })
  @ApiResponse({ status: 200, description: 'Category fetched successfully' })
  findOne(@Param('id') id: string) {
    return "Get"
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update the existing Category' })
  @ApiBody({ type: CreateCategoryDto })
  @ApiResponse({ status: 200, description: 'Category is updated  successfully' })
  async update(@Param('id') id: string, @Body() updateCatagoryDto: UpdateCatgoryDto) {
    return await this.categoriesService.updateCategory(Number(id), updateCatagoryDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete category' })
  @ApiResponse({ status: 200, description: 'Category deleted successfully' })
  remove(@Param('id') id: string) {
    return "dfg"
  }
}
