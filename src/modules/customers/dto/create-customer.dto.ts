import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCustomerDto {
@ApiProperty({example:"Koushik"})
@IsString()
@IsNotEmpty()
customer_name:string

@ApiProperty({example:'9876543231'})
@IsString()
@IsNotEmpty()
customer_phone:string

@ApiProperty({example:'Koushik@gmail.com'})
@IsString()
@IsNotEmpty()
customer_email:string;

@ApiProperty({ example: 'Hyderabad, Telangana' })
@IsString()
@IsNotEmpty()
customer_address: string;
}
