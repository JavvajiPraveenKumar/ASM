import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { InventoryTransactionsService } from './inventory-transactions.service';
import { CreateInventoryTransactionDto } from './dto/create-inventory-transaction.dto';
import { UpdateInventoryTransactionDto } from './dto/update-inventory-transaction.dto';

@ApiTags('Inventory Transactions')
@Controller('inventory-transactions')
export class InventoryTransactionsController {
  constructor(private readonly inventoryTransactionsService: InventoryTransactionsService) { }

  @Post()
  @ApiOperation({ summary: 'Create a new inventory transaction' })
  @ApiBody({ type: CreateInventoryTransactionDto })
  @ApiResponse({ status: 201, description: 'Transaction created successfully' })
  create(@Body() createInventoryTransactionDto: CreateInventoryTransactionDto) {
    return this.inventoryTransactionsService.create(createInventoryTransactionDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all inventory transactions' })
  @ApiResponse({ status: 200, description: 'Transactions fetched successfully' })
  findAll() {
    return this.inventoryTransactionsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get transaction by id' })
  @ApiResponse({ status: 200, description: 'Transaction fetched successfully' })
  findOne(@Param('id') id: string) {
    return this.inventoryTransactionsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update transaction' })
  @ApiBody({ type: UpdateInventoryTransactionDto })
  @ApiResponse({ status: 200, description: 'Transaction updated successfully' })
  update(@Param('id') id: string, @Body() updateInventoryTransactionDto: UpdateInventoryTransactionDto) {
    return this.inventoryTransactionsService.update(+id, updateInventoryTransactionDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete transaction' })
  @ApiResponse({ status: 200, description: 'Transaction deleted successfully' })
  remove(@Param('id') id: string) {
    return this.inventoryTransactionsService.remove(+id);
  }
}
