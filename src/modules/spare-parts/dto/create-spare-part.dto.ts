import { 
  IsNotEmpty, IsString, IsNumber, IsOptional, IsBoolean, IsPositive, MaxLength, Min, IsIn 
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSparePartDto {
  @ApiProperty({ description: 'Unique SKU / identifier for the spare part', maxLength: 100 })
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  partCode: string;

  @ApiProperty({ description: 'Name of the spare part', maxLength: 255 })
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  partName: string;

  @ApiProperty({ description: 'Category ID', example: 1 })
  @IsNotEmpty()
  @IsNumber()
  categoryId: number;

  @ApiProperty({ description: 'Supplier ID', example: 1 })
  @IsNotEmpty()
  @IsNumber()
  supplierId: number;

  @ApiProperty({ description: 'Brand of the vehicle', maxLength: 100 })
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  vehicleBrand: string;

  @ApiProperty({ description: 'Model of the vehicle', maxLength: 100 })
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  vehicleModel: string;

  @ApiProperty({ description: 'Type of the vehicle (Bike, Car)', maxLength: 50 })
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  vehicleType: string;

  @ApiProperty({ description: 'Engine capacity (optional)', required: false, maxLength: 50 })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  engineCc?: string;

  @ApiProperty({ description: 'Part type: Genuine / OEM / Aftermarket', enum: ['Genuine', 'OEM', 'Aftermarket'] })
  @IsNotEmpty()
  @IsString()
  @IsIn(['Genuine', 'OEM', 'Aftermarket'])
  partType: string;

  @ApiProperty({ description: 'Position of the part (optional)', required: false, maxLength: 50 })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  position?: string;

  @ApiProperty({ description: 'Material of the part (optional)', required: false, maxLength: 50 })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  material?: string;

  @ApiProperty({ description: 'Cost price of the part', example: 250.50 })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  costPrice: number;

  @ApiProperty({ description: 'Selling price of the part', example: 300.00 })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  sellingPrice: number;

  @ApiProperty({ description: 'Maximum Retail Price (optional)', required: false, example: 350.00 })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  mrp?: number;

  @ApiProperty({ description: 'GST percentage applicable', example: 18 })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  gstPercentage: number;

  @ApiProperty({ description: 'Current inventory quantity', example: 10 })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  currentStock: number;

  @ApiProperty({ description: 'Minimum stock threshold', example: 5 })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  minStockLevel: number;

  @ApiProperty({ description: 'Unit of measurement (Piece, Set, etc.)', maxLength: 50 })
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  unit: string;

  @ApiProperty({ description: 'Active status of the part', required: false, default: true })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @ApiProperty({ description: 'Optional description of the part', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ description: 'Optional HSN code for tax purposes', required: false, maxLength: 50 })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  hsnCode?: string;
}

