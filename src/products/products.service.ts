import { Injectable } from '@nestjs/common';
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

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
