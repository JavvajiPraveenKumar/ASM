import { Controller, Get, Post, Body, Patch, Param, Delete, Query, DefaultValuePipe, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { SparePartsService } from './spare-parts.service';
import { CreateSparePartDto } from './dto/create-spare-part.dto';
import { UpdateSparePartDto } from './dto/update-spare-part.dto';
import { SparePartsPageOptionsDto } from './dto/spare-parts-page-options.dto';
import { PageDto } from '../../common/dto/page.dto';
import { SparePart } from './entities/spare-part.entity';

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
    const data = await this.sparePartsService.createSparePart(createSparePartDto);
    return {
      message: 'Spare part created successfully',
      data,
    };
  }


  @Get()
  @ApiOperation({ summary: 'Get spare parts with pagination' })
  async findAll(@Query() pageOptionsDto: SparePartsPageOptionsDto): Promise<PageDto<SparePart>> {
    return this.sparePartsService.getPaginatedSpareParts(pageOptionsDto);
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
