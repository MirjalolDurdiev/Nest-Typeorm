import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateShippingDto {
  @IsNotEmpty({ message: 'Phone number cannot be empty.' })
  @IsString({ message: 'phone number format should be string' })
  phone: string;

  @IsOptional()
  @IsString({ message: 'name  format should be string' })
  name: string;

  @IsOptional()
  @IsString({ message: 'address  format should be string' })
  address: string;

  @IsOptional()
  @IsString({ message: 'city  format should be string' })
  city: string;

  @IsOptional()
  @IsString({ message: 'postcode  format should be string' })
  postcode: string;

  @IsOptional()
  @IsString({ message: 'postcode  format should be string' })
  state: string;

  @IsOptional()
  @IsString({ message: 'country  format should be string' })
  country: string;
}
