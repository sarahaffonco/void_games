/* eslint-disable */
import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Param,
    Body,
    ParseIntPipe,
    HttpCode,
    HttpStatus,
} from '@nestjs/common';
import { Categoria } from '../entity/category.entity';
import { CategoriaService } from '../service/category.service';

@Controller('/categorias')
export class CategoriaController {
    constructor(private readonly categoriaService: CategoriaService) {}

    @Post() // Criar categoria
    @HttpCode(HttpStatus.CREATED)
    create(@Body() categoria: Categoria): Promise<Categoria> {
        return this.categoriaService.create(categoria);
    }

    @Get() // Listar todas categorias
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<Categoria[]> {
        return this.categoriaService.findAll();
    }

    @Get('/:id') // Buscar categoria por ID
    @HttpCode(HttpStatus.OK)
    findById(@Param('id', ParseIntPipe) id: number): Promise<Categoria> {
        return this.categoriaService.findById(id);
    }

    @Put('/:id') // Atualizar categoria
    @HttpCode(HttpStatus.OK)
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() categoria: Categoria
    ): Promise<Categoria> {
        return this.categoriaService.update(id, categoria);
    }

    @Delete('/:id') // Deletar categoria
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param('id', ParseIntPipe) id: number) {
        return this.categoriaService.delete(id);
    }
}
