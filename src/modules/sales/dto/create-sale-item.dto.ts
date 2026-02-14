
import { IsInt, IsNumber, Min } from 'class-validator';

export class CreateSaleItemDto {
    @IsInt()
    @Min(1)
    spare_part_id: number;

    @IsInt()
    @Min(1)
    quantity: number;

    @IsNumber()
    @Min(0)
    selling_price: number;
}
