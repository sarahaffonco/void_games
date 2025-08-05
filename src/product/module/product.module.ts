import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProdutoController } from '../controller/product.controller';
import { ProdutoService } from '../service/product.service';
import { Produto } from '../entity/product.entity';
import { CategoriaModule } from '../../category/module/category.module';

@Module({
  imports: [TypeOrmModule.forFeature([Produto]), CategoriaModule],
  controllers: [ProdutoController],
  providers: [ProdutoService],
  exports: [ProdutoService],
})
export class ProdutoModule {}
