import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Basket } from './basket.model';

@Injectable()
export class BasketService {
  constructor(@InjectModel(Basket) private basketRepository: typeof Basket) {}

  async addToBasket(userId: number, trackId: number): Promise<void> {
    await this.basketRepository.create({ userId, trackId });
  }
}
