import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SparePart } from './entities/spare-part.entity';
import { Category } from '../categories/entities/category.entity';
import { Supplier } from '../suppliers/entities/supplier.entity';
import { CreateSparePartDto } from './dto/create-spare-part.dto';
import { UpdateSparePartDto } from './dto/update-spare-part.dto';
import { PageOptionsDto } from '../../common/dto/page-options.dto';
import { PageDto } from '../../common/dto/page.dto';
import { PageMetaDto } from '../../common/dto/page-meta.dto';



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

  async createSparePart(createSparePartDto: CreateSparePartDto) {
    try {
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
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof ConflictException
      ) {
        throw error;
      }
      throw new InternalServerErrorException(
        `Failed to create spare part: ${error.message}`,
      );
    }
  }



  async getPaginatedSpareParts(pageOptionsDto: PageOptionsDto): Promise<PageDto<SparePart>> {
    const queryBuilder = this.sparePartsRepository.createQueryBuilder('sparePart');
    
    queryBuilder
      .orderBy('sparePart.createdAt', pageOptionsDto.order)
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take);

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    return new PageDto(entities, pageMetaDto);
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
