import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({ example: 'Brake System' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'Brake pads, discs, and brake components' })
  @IsString()
  @IsNotEmpty()
  description: string;
}
