import { Module } from '@nestjs/common';
import { CategoryService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category} from "./entities/category.entity"

@Module({
   imports: [
      TypeOrmModule.forFeature([Category]),
    ],
  controllers: [CategoriesController],
  providers: [CategoryService],
})
export class CatagoriesModule {}
