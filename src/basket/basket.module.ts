import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Basket } from './basket.model';
import { BasketService } from './basket.service';

@Module({
  providers: [BasketService],
  imports: [SequelizeModule.forFeature([Basket])],
  exports: [BasketService],
})
export class BasketModule {}
