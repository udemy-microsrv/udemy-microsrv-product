import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import validationSchema from './config/env.validation';
import { PrismaService } from './prisma.service';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validationSchema,
    }),
    ProductsModule,
  ],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
