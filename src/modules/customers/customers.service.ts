import { Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from './entities/customer.entity';
import { Repository } from 'typeorm';
@Injectable()
export class CustomersService {
  private readonly logger = new Logger(CustomersService.name);

  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
  ) { }


  async createCustomer(createCustomerDto: CreateCustomerDto) {
    try {
      const customerPayload: Partial<Customer> = {
        customer_name: createCustomerDto.customer_name,
        customer_phone: createCustomerDto.customer_phone,
        customer_email: createCustomerDto.customer_email,
        customer_address: createCustomerDto.customer_address,
      };
      const customer = this.customerRepository.create(customerPayload);
      return await this.customerRepository.save(customer);
    } catch (error) {
      this.logger.error('Error creating the Customer', error.stack);
      throw new InternalServerErrorException(
        'Unable to create customer at this time',
      );
    }
  }

  async findAllCustomers(): Promise<Customer[]> {
    try {
      return await this.customerRepository.find({
        order: { createdAt: 'DESC' },
      });
    } catch (error) {
      this.logger.error('Error fetching Customers', error.stack);
      throw new InternalServerErrorException(
        'Unable to fetch customers at this time',
      );
    }
  }

  async findOne(id: number) {
    const customer = await this.customerRepository.findOne({
      where: { id },
    });
    if (!customer) {
      throw new NotFoundException(`Customer with id ${id} not found`);
    }
    return customer;
  }

  async updateCustomer(
    id: number,
    updateCustomerDto: UpdateCustomerDto,
  ): Promise<Customer> {
    try {
      const customer = await this.findOne(id);
      const updatedCustomer = this.customerRepository.merge(
        customer,
        updateCustomerDto,
      );
      return await this.customerRepository.save(updatedCustomer);
    } catch (error) {
      this.logger.error('Error updating the Customer', error.stack);
      throw new InternalServerErrorException(
        'Unable to update customer at this time',
      );
    }
  }

  async remove(id: number) {
    const customer = await this.findOne(id);
    try {
      return await this.customerRepository.remove(customer);
    } catch (error) {
      this.logger.error('Error deleting the Customer', error.stack);
      throw new InternalServerErrorException(
        'Unable to delete customer at this time',
      );
    }
  }
}
