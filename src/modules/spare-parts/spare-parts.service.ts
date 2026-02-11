import { ConflictException, Injectable, InternalServerErrorException, NotFoundException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, Repository } from 'typeorm';
import { SparePart } from './entities/spare-part.entity';
import { Category } from '../categories/entities/category.entity';
import { Supplier } from '../suppliers/entities/supplier.entity';
import { CreateSparePartDto } from './dto/create-spare-part.dto';
import { UpdateSparePartDto } from './dto/update-spare-part.dto';
import { SparePartsPageOptionsDto } from './dto/spare-parts-page-options.dto';
import { PageDto } from '../../common/dto/page.dto';
import { PageMetaDto } from '../../common/dto/page-meta.dto';



@Injectable()
export class SparePartsService {
  private readonly logger = new Logger(SparePartsService.name);


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



  async getPaginatedSpareParts(
    pageOptionsDto: SparePartsPageOptionsDto,
  ): Promise<PageDto<SparePart>> {
    try {
      const queryBuilder =
        this.sparePartsRepository.createQueryBuilder('sparePart');

      queryBuilder.select([
        'sparePart.id',
        'sparePart.partCode',
        'sparePart.partName',
        'sparePart.vehicleBrand',
        'sparePart.vehicleModel',
        'sparePart.sellingPrice',
        'sparePart.currentStock',
        'sparePart.isActive',
        'sparePart.createdAt',
      ]);

      if (pageOptionsDto.vehicleBrand) {
        queryBuilder.andWhere('sparePart.vehicleBrand = :vehicleBrand', {
          vehicleBrand: pageOptionsDto.vehicleBrand,
        });
      }

      if (pageOptionsDto.vehicleModel) {
        queryBuilder.andWhere('sparePart.vehicleModel = :vehicleModel', {
          vehicleModel: pageOptionsDto.vehicleModel,
        });
      }

      if (pageOptionsDto.vehicleType) {
        queryBuilder.andWhere('sparePart.vehicleType = :vehicleType', {
          vehicleType: pageOptionsDto.vehicleType,
        });
      }

      if (pageOptionsDto.categoryId) {
        queryBuilder.andWhere('sparePart.categoryId = :categoryId', {
          categoryId: pageOptionsDto.categoryId,
        });
      }

      if (pageOptionsDto.supplierId) {
        queryBuilder.andWhere('sparePart.supplierId = :supplierId', {
          supplierId: pageOptionsDto.supplierId,
        });
      }

      if (pageOptionsDto.isActive !== undefined) {
        queryBuilder.andWhere('sparePart.isActive = :isActive', {
          isActive: pageOptionsDto.isActive,
        });
      }

      if (pageOptionsDto.search) {
        queryBuilder.andWhere(
          new Brackets((qb) => {
            qb.where('sparePart.partName LIKE :search', {
              search: `%${pageOptionsDto.search}%`,
            }).orWhere('sparePart.partCode LIKE :search', {
              search: `%${pageOptionsDto.search}%`,
            });
          }),
        );
      }

      queryBuilder
        .orderBy('sparePart.createdAt', pageOptionsDto.order)
        .skip(pageOptionsDto.skip)
        .take(pageOptionsDto.take);

      const itemCount = await queryBuilder.getCount();
      const { entities } = await queryBuilder.getRawAndEntities();

      const pageMetaDto = new PageMetaDto({
        itemCount,
        pageOptionsDto,
      });

      return new PageDto(entities, pageMetaDto);
    } catch (error) {
      this.logger.error('Error fetching the Spare-parts', error.stack);
      throw new InternalServerErrorException('Failed to fetch spare parts');
    }
  }



 async GetSparePart(id: number) {
    return this.sparePartsRepository.findOne({ where: { id } });
  }

  update(id: number, updateSparePartDto: UpdateSparePartDto) {
    return `This action updates a #${id} sparePart`;
  }

  remove(id: number) {
    return `This action removes a #${id} sparePart`;
  }
}
