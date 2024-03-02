import { CategoryEntity } from 'src/categories/entities/category.entity';
import { OrderEntity } from 'src/orders/entities/order.entity';
import { OrdersProductsEntity } from 'src/orders/entities/orders.products';
import { shippingEntity } from 'src/orders/entities/shipping.entity';
import { ProductEntity } from 'src/products/entities/product.entity';
import { ProductsModule } from 'src/products/products.module';
import { ReviewEntity } from 'src/reviews/entities/review.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: (process.env.DB_TYPE as 'postgres') || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT, 10) || 5432,
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'admin',
  database: process.env.DB_DATABASE || 'Ecommerse',
  entities: [
    UserEntity,
    CategoryEntity,
    ProductEntity,
    ReviewEntity,
    OrderEntity,
    shippingEntity,
    OrdersProductsEntity,
  ],
  migrations: ['dist/db/migrations/*{.ts,.js}'],
  synchronize: false,
  logging: true,
};

const dataSource = new DataSource(dataSourceOptions);
dataSource.initialize();
export default dataSource;
