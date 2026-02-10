import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsBoolean, IsInt, IsOptional, IsString } from 'class-validator';
import { PageOptionsDto } from '../../../common/dto/page-options.dto';

export class SparePartsPageOptionsDto extends PageOptionsDto {
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    readonly vehicleBrand?: string;

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    readonly vehicleModel?: string;

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    readonly vehicleType?: string;

    @ApiPropertyOptional()
    @Type(() => Number)
    @IsInt()
    @IsOptional()
    readonly categoryId?: number;

    @ApiPropertyOptional()
    @Type(() => Number)
    @IsInt()
    @IsOptional()
    readonly supplierId?: number;

    @ApiPropertyOptional()
    @IsBoolean()
    @Type(() => Boolean) // transform query param 'true'/'false' to boolean
    @IsOptional()
    readonly isActive?: boolean;

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    readonly search?: string;
}
