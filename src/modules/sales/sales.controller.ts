import { ApiTags, ApiOperation, ApiBody, ApiResponse } from '@nestjs/swagger';
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SalesService } from './sales.service';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';

@ApiTags('Sales')
@Controller('sales')
export class SalesController {
  constructor(private readonly salesService: SalesService) { }

  @Post("transaction")
  @ApiOperation({ summary: 'Create a new sale transaction' })
  @ApiBody({ type: CreateSaleDto })
  @ApiResponse({ status: 201, description: 'The sale transaction has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  create(@Body() createSaleDto: CreateSaleDto) {
    return this.salesService.createSaleTransaction(createSaleDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all sales' })
  @ApiResponse({ status: 200, description: 'Sales fetched successfully' })
  findAll() {
    return this.salesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get sale by id' })
  @ApiResponse({ status: 200, description: 'Sale fetched successfully' })
  findOne(@Param('id') id: string) {
    return this.salesService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update sale' })
  @ApiBody({ type: UpdateSaleDto })
  @ApiResponse({ status: 200, description: 'Sale updated successfully' })
  update(@Param('id') id: string, @Body() updateSaleDto: UpdateSaleDto) {
    return this.salesService.update(+id, updateSaleDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete sale' })
  @ApiResponse({ status: 200, description: 'Sale deleted successfully' })
  remove(@Param('id') id: string) {
    return this.salesService.remove(+id);
  }
}
