import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateMechanicDto {
    @ApiProperty({ example: 'John Doe', description: 'Name of the mechanic' })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ example: '9876543210', description: 'Phone number of the mechanic' })
    @IsString()
    @IsNotEmpty()
    @Length(10, 15)
    phone: string;
}
