import { PartialType } from '@nestjs/swagger';
import { CreateSparePartDto } from './create-spare-part.dto';
import { IsOptional } from 'class-validator';

export class UpdateSparePartDto extends PartialType(CreateSparePartDto) {
    @IsOptional()
    id?: number;

    @IsOptional()
    createdAt?: Date | string;

    @IsOptional()
    updatedAt?: Date | string;
}
