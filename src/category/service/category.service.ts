import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Categoria } from '../entity/category.entity';

@Injectable()
export class CategoriaService {
  constructor(
    @InjectRepository(Categoria)
    private categoriaRepository: Repository<Categoria>,
  ) {}

  async create(categoria: Categoria): Promise<Categoria> {
    return await this.categoriaRepository.save(categoria);
  }

  async findAll(): Promise<Categoria[]> {
    return await this.categoriaRepository.find({
      relations: ['produtos'], // Carrega os produtos relacionados
    });
  }

  async findById(id: number): Promise<Categoria> {
    const categoria = await this.categoriaRepository.findOne({
      where: { id },
      relations: ['produtos'],
    });

    if (!categoria) {
      throw new HttpException(
        'Categoria não encontrada!',
        HttpStatus.NOT_FOUND,
      );
    }

    return categoria;
  }

  async update(id: number, categoria: Categoria): Promise<Categoria> {
    await this.categoriaRepository.update(id, categoria);
    return this.findById(id);
  }

  async delete(id: number): Promise<void> {
    await this.categoriaRepository.delete(id);
  }
}
