/* eslint-disable */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Categoria} from './category/entity/category.entity';
import { CategoriaModule } from './category/module/category.module';
import { ProdutoModule } from './product/module/product.module';
import { Produto } from './product/entity/product.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '513610',
      database: 'db_void_games',
      entities: [Categoria, Produto],
      synchronize: true,
    }),
    CategoriaModule,
    ProdutoModule,
  ],
})
export class AppModule {}
