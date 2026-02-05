import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSupplierDto {
  @ApiProperty({ example: 'ABC Auto Spares' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: '9876543210' })
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiProperty({ example: 'Hyderabad, Telangana' })
  @IsString()
  @IsNotEmpty()
  address: string;
}

