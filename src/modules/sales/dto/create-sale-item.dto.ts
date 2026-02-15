import { IsInt, IsNumber, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSaleItemDto {
    @ApiProperty({ example: 1, description: 'The ID of the spare part' })
    @IsInt()
    @Min(1)
    spare_part_id: number;

    @ApiProperty({ example: 2, description: 'The quantity of the spare part' })
    @IsInt()
    @Min(1)
    quantity: number;

    @ApiProperty({ example: 150.00, description: 'The selling price per unit' })
    @IsNumber()
    @Min(0)
    selling_price: number;
}
