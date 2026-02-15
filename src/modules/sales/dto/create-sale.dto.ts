import { Type } from 'class-transformer';
import {
    IsArray,
    IsDateString,
    IsEnum,
    IsInt,
    IsNumber,
    IsOptional,
    IsString,
    Min,
    ValidateNested,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CreateSaleItemDto } from './create-sale-item.dto';

export enum SaleType {
    COUNTER = 'Counter',
    WORKSHOP = 'Company',
}

export enum PaymentStatus {
    PENDING = 'Pending',
    PARTIAL = 'Partial',
    PAID = 'Paid',
}

export class CreateSaleDto {
    @ApiProperty({ example: 1, description: 'The ID of the customer', required: false })
    @IsOptional()
    @IsInt()
    customer_id?: number;

    @ApiProperty({ enum: SaleType, example: SaleType.COUNTER, description: 'The type of sale (Counter or Company)' })
    @IsEnum(SaleType)
    sale_type: SaleType;

    @ApiProperty({ example: 300.00, description: 'The total amount of the sale' })
    @IsNumber()
    @Min(0)
    total_amount: number;

    @ApiProperty({ example: 300.00, description: 'The amount paid by the customer' })
    @IsNumber()
    @Min(0)
    paid_amount: number;

    @ApiProperty({ enum: PaymentStatus, example: PaymentStatus.PAID, description: 'The payment status' })
    @IsString()
    payment_status: PaymentStatus;

    @ApiProperty({ example: '2023-10-27', description: 'The date of the sale (YYYY-MM-DD)' })
    @IsDateString()
    sale_date: string; // YYYY-MM-DD

    @ApiProperty({ type: [CreateSaleItemDto], description: 'List of items in the sale' })
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateSaleItemDto)
    items: CreateSaleItemDto[];

    @ApiProperty({ example: 1, description: 'The ID of the mechanic', required: false })
    @IsOptional()
    @IsInt()
    mechanic_id?: number;

    @ApiProperty({ example: 'Cash', description: 'The mode of payment' })
    @IsString()
    payment_mode: string;
}
