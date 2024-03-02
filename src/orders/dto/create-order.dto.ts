import { Type } from 'class-transformer';
import { CreateShippingDto } from './createShipping.dto';
import { ValidateNested } from 'class-validator';
import { OrderedProductsDto } from './create.products.dto';

export class CreateOrderDto {
  @Type(() => CreateShippingDto)
  @ValidateNested()
  shippingAddress: CreateShippingDto;

  @Type(() => OrderedProductsDto)
  @ValidateNested()
  orderedProducts: OrderedProductsDto[];
}
