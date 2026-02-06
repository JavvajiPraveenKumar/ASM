import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SparePart } from './entities/spare-part.entity';
import { Category } from '../categories/entities/category.entity';
import { Supplier } from '../suppliers/entities/supplier.entity';
import { CreateSparePartDto } from './dto/create-spare-part.dto';
import { UpdateSparePartDto } from './dto/update-spare-part.dto';

@Injectable()
export class SparePartsService {
  constructor(
    @InjectRepository(SparePart)
    private readonly sparePartsRepository: Repository<SparePart>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(Supplier)
    private readonly supplierRepository: Repository<Supplier>,
  ) { }

  async create(createSparePartDto: CreateSparePartDto) {
    const { categoryId, supplierId, partCode } = createSparePartDto;

    // Validate Category
    const category = await this.categoryRepository.findOne({
      where: { id: categoryId },
    });
    if (!category) {
      throw new NotFoundException(`Category with ID ${categoryId} not found`);
    }

    // Validate Supplier
    const supplier = await this.supplierRepository.findOne({
      where: { id: supplierId },
    });
    if (!supplier) {
      throw new NotFoundException(`Supplier with ID ${supplierId} not found`);
    }

    // Validate Duplicate Part Code
    const existingPart = await this.sparePartsRepository.findOne({
      where: { partCode },
    });

    if (existingPart) {
      throw new ConflictException(
        `Spare part with code ${partCode} already exists`,
      );
    }

    const newPart = this.sparePartsRepository.create(createSparePartDto);
    return await this.sparePartsRepository.save(newPart);
  }

  findAll() {
    return this.sparePartsRepository.find();
  }

  findOne(id: number) {
    return this.sparePartsRepository.findOne({ where: { id } });
  }

  update(id: number, updateSparePartDto: UpdateSparePartDto) {
    return `This action updates a #${id} sparePart`;
  }

  remove(id: number) {
    return `This action removes a #${id} sparePart`;
  }
}
