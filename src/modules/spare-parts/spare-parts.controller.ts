import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody, ApiResponse } from '@nestjs/swagger';
import { SparePartsService } from './spare-parts.service';
import { CreateSparePartDto } from './dto/create-spare-part.dto';
import { UpdateSparePartDto } from './dto/update-spare-part.dto';

@Controller('spare-parts')
@ApiTags('Spare Parts')
export class SparePartsController {
  constructor(private readonly sparePartsService: SparePartsService) { }

  @Post()
  @ApiOperation({ summary: 'Create a new spare part' })
  @ApiBody({ type: CreateSparePartDto })
  @ApiResponse({
    status: 201,
    description: 'Spare part created successfully',
  })
  @ApiResponse({
    status: 409,
    description: 'Spare part with this code already exists',
  })
  async create(@Body() createSparePartDto: CreateSparePartDto) {
    const data = await this.sparePartsService.create(createSparePartDto);
    return {
      message: 'Spare part created successfully',
      data,
    };
  }

  @Get()
  findAll() {
    return this.sparePartsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sparePartsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSparePartDto: UpdateSparePartDto) {
    return this.sparePartsService.update(+id, updateSparePartDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sparePartsService.remove(+id);
  }
}
