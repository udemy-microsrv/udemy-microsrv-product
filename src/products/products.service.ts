import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma.service';
import { PaginationDto } from 'src/common/pagination/pagination.dto';

@Injectable()
export class ProductsService {
  constructor(private prismaService: PrismaService) {}

  create(createProductDto: CreateProductDto) {
    return this.prismaService.product.create({
      data: createProductDto,
    });
  }

  async findAll(paginationDto: PaginationDto) {
    const { page, limit } = paginationDto;

    const total = await this.prismaService.product.count();
    const lastPage = Math.ceil(total / limit);

    return {
      data: await this.prismaService.product.findMany({
        skip: (page - 1) * limit,
        take: limit,
      }),
      meta: {
        page,
        limit,
        total,
        lastPage,
      },
    };
  }

  async findOne(id: number) {
    const product = await this.prismaService.product.findUnique({
      where: {
        id,
      },
    });

    if (!product) {
      throw new NotFoundException();
    }

    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    await this.findOne(id);

    return this.prismaService.product.update({
      where: { id },
      data: updateProductDto,
    });
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
