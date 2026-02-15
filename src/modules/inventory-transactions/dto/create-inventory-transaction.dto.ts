import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class CreateInventoryTransactionDto {
    @ApiProperty({ example: 1, description: 'The ID of the spare part' })
    @IsInt()
    @IsNotEmpty()
    spare_part_id: number;

    @ApiProperty({ example: 'IN', description: 'Transaction type (IN/OUT)' })
    @IsString()
    @IsNotEmpty()
    type: string;

    @ApiProperty({ example: 10, description: 'Quantity of the spare part' })
    @IsInt()
    @Min(1)
    quantity: number;

    @ApiProperty({ example: 'Purchase', description: 'Reference type (Purchase/Sale/Adjustment)' })
    @IsString()
    @IsNotEmpty()
    reference_type: string;

    @ApiProperty({ example: 101, description: 'Reference ID (e.g., Purchase Order ID or Sale ID)', required: false })
    @IsOptional()
    @IsNumber()
    reference_id?: number;
}
