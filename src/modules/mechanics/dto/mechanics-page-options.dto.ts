import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { PageOptionsDto } from '../../../common/dto/page-options.dto';

export class MechanicsPageOptionsDto extends PageOptionsDto {
    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    readonly name?: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    readonly phone?: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    readonly search?: string;
}
