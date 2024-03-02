import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  Min,
} from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty({ message: 'Title can not be empty' })
  @IsString()
  title: string;

  @IsNotEmpty({ message: 'description can not be empty' })
  @IsString()
  description: string;

  @IsNotEmpty({ message: 'Price should not be empty' })
  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: 'price should be number & and max decimal precission 2' },
  )
  @IsPositive()
  price: number;

  @IsNotEmpty({ message: 'stock should not be empty' })
  @IsNumber({}, { message: 'price should be number' })
  @Min(0, { message: 'stock can not be negative.' })
  stock: number;
  @IsNotEmpty({ message: 'Images should not be empty' })
  @IsArray({ message: 'images should be in array format' })
  images: string[];

  @IsNotEmpty({ message: 'category should not be empty' })
  @IsNumber({}, { message: 'category must be number' })
  categoryId: number;
}
