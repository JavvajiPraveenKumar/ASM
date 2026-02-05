import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiParam,
} from '@nestjs/swagger';

import { SuppliersService } from './suppliers.service';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';

@Controller('suppliers')
export class SuppliersController {
  constructor(
    private readonly suppliersService: SuppliersService,
  ) {}

 
  //CREATE SUPPLIER
  @Post()
  @ApiOperation({ summary: 'Create a new supplier' })
  @ApiBody({ type: CreateSupplierDto })
  @ApiResponse({
    status: 201,
    description: 'Supplier created successfully',
  })
  async createSupplier(
    @Body() createSupplierDto: CreateSupplierDto,
  ) {
    return this.suppliersService.createSupplier(
      createSupplierDto,
    );
  }

   //  GET ALL SUPPLIERS  
  @Get()
  @ApiOperation({ summary: 'Get all suppliers' })
  @ApiResponse({
    status: 200,
    description: 'Suppliers fetched successfully',
  })
  async findAllSuppliers() {
    return this.suppliersService.findAllSuppliers();
  }

  //   GET SUPPLIER BY ID 
  @Get(':id')
  @ApiOperation({ summary: 'Get supplier by id' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({
    status: 200,
    description: 'Supplier fetched successfully',
  })
  async findSupplierById(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.suppliersService.findSupplierById(id);
  }

 
  //   UPDATE SUPPLIER
  @Patch(':id')
  @ApiOperation({ summary: 'Update supplier details' })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type:CreateSupplierDto})
  @ApiResponse({
    status: 200,
    description: 'Supplier updated successfully',
  })
  async updateSupplier(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSupplierDto: UpdateSupplierDto,
  ) {
    return this.suppliersService.updateSupplier(
      id,
      updateSupplierDto,
    );
  }
   //  DELETE SUPPLIER   
  @Delete(':id')
  @ApiOperation({ summary: 'Delete supplier by id' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({
    status: 200,
    description: 'Supplier deleted successfully',
  })
  async deleteSupplier(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.suppliersService.deleteSupplierById(id);
  }
}
