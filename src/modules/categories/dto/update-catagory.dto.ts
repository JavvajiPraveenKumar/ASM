import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoryDto } from './create-catagory.dto';

export class UpdateCatgoryDto extends PartialType(CreateCategoryDto) {
}
