import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Produto } from '../entity/product.entity';
import { CategoriaService } from '../../category/service/category.service';

@Injectable()
export class ProdutoService {
  constructor(
    @InjectRepository(Produto)
    private produtoRepository: Repository<Produto>,
    private categoriaService: CategoriaService,
  ) {}

  async create(produto: Produto): Promise<Produto> {
    // Verifica se a categoria existe
    if (produto.categoria) {
      await this.categoriaService.findById(produto.categoria.id);
    }
    return await this.produtoRepository.save(produto);
  }

  async findAll(): Promise<Produto[]> {
    return await this.produtoRepository.find({
      relations: ['categoria'],
    });
  }

  async findById(id: number): Promise<Produto> {
    const produto = await this.produtoRepository.findOne({
      where: { id },
      relations: ['categoria'],
    });

    if (!produto) {
      throw new Error('Produto não encontrado');
    }

    return produto;
  }

  async update(id: number, produto: Produto): Promise<Produto> {
    // Verifica se o produto existe
    await this.findById(id);

    // Verifica se a categoria existe
    if (produto.categoria) {
      await this.categoriaService.findById(produto.categoria.id);
    }

    await this.produtoRepository.update(id, produto);
    return this.findById(id);
  }

  async delete(id: number): Promise<void> {
    await this.produtoRepository.delete(id);
  }
}
