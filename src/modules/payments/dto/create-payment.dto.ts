import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsInt, IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CreatePaymentDto {
    @ApiProperty({ example: 1, description: 'The ID of the sale' })
    @IsInt()
    @IsNotEmpty()
    sale_id: number;

    @ApiProperty({ example: 500.00, description: 'The payment amount' })
    @IsNumber()
    @Min(0)
    amount: number;

    @ApiProperty({ example: 'Cash', description: 'Mode of payment (Cash/Card/UPI)' })
    @IsString()
    @IsNotEmpty()
    payment_mode: string;

    @ApiProperty({ example: '2023-10-27', description: 'Date of payment (YYYY-MM-DD)' })
    @IsDateString()
    payment_date: Date;
}
