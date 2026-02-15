import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { MechanicsService } from './mechanics.service';
import { CreateMechanicDto } from './dto/create-mechanic.dto';
import { UpdateMechanicDto } from './dto/update-mechanic.dto';

@ApiTags('Mechanics')
@Controller('mechanics')
export class MechanicsController {
  constructor(private readonly mechanicsService: MechanicsService) { }

  @Post()
  @ApiOperation({ summary: 'Create a new mechanic' })
  @ApiBody({ type: CreateMechanicDto })
  @ApiResponse({ status: 201, description: 'Mechanic created successfully' })
  create(@Body() createMechanicDto: CreateMechanicDto) {
    return this.mechanicsService.create(createMechanicDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all mechanics' })
  @ApiResponse({ status: 200, description: 'Mechanics fetched successfully' })
  findAll() {
    return this.mechanicsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get mechanic by id' })
  @ApiResponse({ status: 200, description: 'Mechanic fetched successfully' })
  findOne(@Param('id') id: string) {
    return this.mechanicsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update mechanic' })
  @ApiBody({ type: UpdateMechanicDto })
  @ApiResponse({ status: 200, description: 'Mechanic updated successfully' })
  update(@Param('id') id: string, @Body() updateMechanicDto: UpdateMechanicDto) {
    return this.mechanicsService.update(+id, updateMechanicDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete mechanic' })
  @ApiResponse({ status: 200, description: 'Mechanic deleted successfully' })
  remove(@Param('id') id: string) {
    return this.mechanicsService.remove(+id);
  }
}
