import { ApiProperty } from '@nestjs/swagger';
import { FLOAT } from 'sequelize';
import { BOOLEAN } from 'sequelize';
import { STRING } from 'sequelize';
import { Column, HasMany, HasOne, Model, Table } from 'sequelize-typescript';
import { Basket } from '../../basket/basket.model';
import { Review } from './review.model';

@Table({ tableName: 'track' })
export class Track extends Model<Track> {
  @ApiProperty({ example: 'Queen', description: 'Auhtor name of this record' })
  @Column({ type: STRING, allowNull: false })
  authorName: string;
  @ApiProperty({
    example: 'We will rock you',
    description: 'Name of the record',
  })
  @Column({ type: STRING, allowNull: false })
  name: string;
  @ApiProperty({
    example:
      'Rock you means to shake you, to make you think again, to dissemble the pride you think it is worth holding on to',
    description: 'record description',
  })
  @Column({ type: STRING, allowNull: false })
  description: string;
  @ApiProperty({
    example: 'queenwewillrockyou.jpg',
    description: 'record image',
  })
  @Column({ type: STRING, allowNull: false })
  image: string;
  @ApiProperty({ example: 'wewillrockyou.mp3', description: 'the song' })
  @Column({ type: STRING, allowNull: false })
  audio: string;
  @ApiProperty({
    example: '12$',
    description: 'the price for which you can buy this record',
  })
  @Column({ type: FLOAT, allowNull: false })
  price: number;
  @ApiProperty({
    example: 'true',
    description: 'a flag that shows if the track has been purchased',
  })
  @Column({ type: BOOLEAN, defaultValue: false })
  isSold: boolean;

  @HasOne(() => Basket)
  basket: Basket;

  @HasMany(() => Review)
  comments: Review[];
}
