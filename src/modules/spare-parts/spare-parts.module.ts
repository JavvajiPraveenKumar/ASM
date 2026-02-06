import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SparePart } from './entities/spare-part.entity';
import { Category } from '../categories/entities/category.entity';
import { Supplier } from '../suppliers/entities/supplier.entity';
import { SparePartsService } from './spare-parts.service';
import { SparePartsController } from './spare-parts.controller';

@Module({
  imports: [TypeOrmModule.forFeature([SparePart, Category, Supplier])],
  controllers: [SparePartsController],
  providers: [SparePartsService],
})
export class SparePartsModule { }
