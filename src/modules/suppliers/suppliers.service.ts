import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, QueryFailedError } from 'typeorm';

import { Supplier } from './entities/supplier.entity';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';

@Injectable()
export class SuppliersService {
  private readonly logger = new Logger(SuppliersService.name);

  constructor(
    @InjectRepository(Supplier)
    private readonly supplierRepository: Repository<Supplier>,
  ) {}


    // CREATE SUPPLIER  
  async createSupplier(dto: CreateSupplierDto): Promise<Supplier> {
    try {
      const supplierPayload: Partial<Supplier> = {
        name: dto.name,
        phone: dto.phone,
        address: dto.address,
      };
      const supplier = this.supplierRepository.create(supplierPayload);
      return await this.supplierRepository.save(supplier);
    } catch (error) {
      this.logger.error('Error creating supplier', error.stack);
      throw new InternalServerErrorException(
        'Unable to create supplier at this time',
      );
    }
  }

  async findAllSuppliers(): Promise<Supplier[]> {
    try {
      return await this.supplierRepository.find({
        order: { createdAt: 'DESC' },
      });
    } catch (error) {
      this.logger.error('Error fetching suppliers', error.stack);
      throw new InternalServerErrorException(
        'Unable to fetch suppliers at this time',
      );
    }
  }

  async findSupplierById(id: number): Promise<Supplier> {
    const supplier = await this.supplierRepository.findOne({
      where: { id },
    });
    if (!supplier) {
      throw new NotFoundException(
      `Supplier with id ${id} not found`,
      );
    }
    return supplier;
  }
  
  async updateSupplier(
    id: number,
    dto: UpdateSupplierDto,
  ): Promise<Supplier> {
    try {
      const supplier = await this.findSupplierById(id);
      const updatedSupplier = this.supplierRepository.merge(
        supplier,
        dto,
      );

      return await this.supplierRepository.save(updatedSupplier);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      this.logger.error(
        `Error updating supplier with id ${id}`,
        error.stack,
      );

      throw new InternalServerErrorException(
        'Unable to update supplier at this time',
      );
    }
  }
  async deleteSupplierById(
    id: number,
  ): Promise<{ message: string }> {
    try {
      const supplier = await this.findSupplierById(id);

      await this.supplierRepository.remove(supplier);

      return {
        message: 'Supplier deleted successfully',
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      this.logger.error(
        `Error deleting supplier with id ${id}`,
        error.stack,
      );

      throw new InternalServerErrorException(
        'Unable to delete supplier at this time',
      );
    }
  }
}
