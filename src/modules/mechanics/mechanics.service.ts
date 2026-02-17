import { Injectable, HttpException, HttpStatus, Logger, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Brackets } from 'typeorm';
import { Mechanic } from './entities/mechanic.entity';
import { CreateMechanicDto } from './dto/create-mechanic.dto';
import { UpdateMechanicDto } from './dto/update-mechanic.dto';
import { MechanicsPageOptionsDto } from './dto/mechanics-page-options.dto';
import { PageDto } from '../../common/dto/page.dto';
import { PageMetaDto } from '../../common/dto/page-meta.dto';

@Injectable()
export class MechanicsService {
  private readonly logger = new Logger(MechanicsService.name);

  constructor(
    @InjectRepository(Mechanic)
    private readonly mechanicRepository: Repository<Mechanic>,
  ) { }

  async create(createMechanicDto: CreateMechanicDto) {
    try {
      const mechanic = this.mechanicRepository.create(createMechanicDto);
      return await this.mechanicRepository.save(mechanic);
    } catch (error) {
      this.logger.error(`Failed to create mechanic: ${error.message}`, error.stack);
      throw new HttpException(
        error.message || 'Failed to create mechanic',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll() {
    try {
      return await this.mechanicRepository.find();
    } catch (error) {
      this.logger.error(`Failed to fetch mechanics: ${error.message}`, error.stack);
      throw new HttpException(
        error.message || 'Failed to fetch mechanics',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getPaginatedMechanics(pageOptionsDto: MechanicsPageOptionsDto): Promise<PageDto<Mechanic>> {
    try {
      const queryBuilder = this.mechanicRepository.createQueryBuilder('mechanic');

      if (pageOptionsDto.name) {
        queryBuilder.andWhere('mechanic.name LIKE :name', { name: `%${pageOptionsDto.name}%` });
      }

      if (pageOptionsDto.phone) {
        queryBuilder.andWhere('mechanic.phone LIKE :phone', { phone: `%${pageOptionsDto.phone}%` });
      }

      if (pageOptionsDto.search) {
        queryBuilder.andWhere(
          new Brackets((qb) => {
            qb.where('mechanic.name LIKE :search', { search: `%${pageOptionsDto.search}%` })
              .orWhere('mechanic.phone LIKE :search', { search: `%${pageOptionsDto.search}%` });
          }),
        );
      }

      queryBuilder
        .orderBy('mechanic.id', pageOptionsDto.order)
        .skip(pageOptionsDto.skip)
        .take(pageOptionsDto.take);

      const itemCount = await queryBuilder.getCount();
      const { entities } = await queryBuilder.getRawAndEntities();

      const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

      return new PageDto(entities, pageMetaDto);
    } catch (error) {
      this.logger.error(`Error fetching paginated mechanics: ${error.message}`, error.stack);
      throw new InternalServerErrorException('Failed to fetch mechanics');
    }
  }

  async findOne(id: number) {
    try {
      const mechanic = await this.mechanicRepository.findOneBy({ id });
      if (!mechanic) {
        this.logger.warn(`Mechanic with ID ${id} not found`);
        throw new HttpException('Mechanic not found', HttpStatus.NOT_FOUND);
      }
      return mechanic;
    } catch (error) {
      if (error instanceof HttpException) throw error;
      this.logger.error(`Failed to fetch mechanic ${id}: ${error.message}`, error.stack);
      throw new HttpException(
        error.message || 'Failed to fetch mechanic',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(id: number, updateMechanicDto: UpdateMechanicDto) {
    try {
      const mechanic = await this.findOne(id);
      Object.assign(mechanic, updateMechanicDto);
      return await this.mechanicRepository.save(mechanic);
    } catch (error) {
      if (error instanceof HttpException) throw error;
      this.logger.error(`Failed to update mechanic ${id}: ${error.message}`, error.stack);
      throw new HttpException(
        error.message || 'Failed to update mechanic',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: number) {
    try {
      const result = await this.mechanicRepository.delete(id);
      if (result.affected === 0) {
        this.logger.warn(`Mechanic with ID ${id} not found for deletion`);
        throw new HttpException('Mechanic not found', HttpStatus.NOT_FOUND);
      }
      return { message: 'Mechanic deleted successfully' };
    } catch (error) {
      if (error instanceof HttpException) throw error;
      this.logger.error(`Failed to delete mechanic ${id}: ${error.message}`, error.stack);
      throw new HttpException(
        error.message || 'Failed to delete mechanic',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
