import { Controller, ParseArrayPipe, ParseIntPipe } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PaginationDto } from 'src/common/pagination/pagination.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @MessagePattern('products.create')
  create(@Payload() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @MessagePattern('products.find_all')
  findAll(@Payload() paginationDto: PaginationDto) {
    return this.productsService.findAll(paginationDto);
  }

  @MessagePattern('products.find_one')
  findOne(@Payload('id', ParseIntPipe) id: number) {
    return this.productsService.findOne(id);
  }

  @MessagePattern('products.find_many')
  findMany(
    @Payload('ids', new ParseArrayPipe({ items: Number })) ids: number[],
  ) {
    return this.productsService.findMany(ids);
  }

  @MessagePattern('products.update')
  update(@Payload() updateProductDto: UpdateProductDto) {
    return this.productsService.update(updateProductDto);
  }

  @MessagePattern('products.delete')
  remove(@Payload('id', ParseIntPipe) id: number) {
    return this.productsService.remove(id);
  }
}
