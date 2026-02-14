
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
    @IsOptional()
    @IsInt()
    customer_id?: number;

    @IsEnum(SaleType)
    sale_type: SaleType;

    @IsNumber()
    @Min(0)
    total_amount: number;

    @IsNumber()
    @Min(0)
    paid_amount: number;

    @IsString()
    payment_status: PaymentStatus;

    @IsDateString()
    sale_date: string; // YYYY-MM-DD

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateSaleItemDto)
    items: CreateSaleItemDto[];

    @IsOptional()
    @IsInt()
    mechanic_id?: number;

    @IsString()
    payment_mode: string;
}
