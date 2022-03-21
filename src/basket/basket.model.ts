import { ApiProperty } from '@nestjs/swagger';
import { INTEGER } from 'sequelize';
import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Track } from '../track/models/track.model';
import { User } from '../user/user.model';

@Table({ tableName: 'basket' })
export class Basket extends Model<Basket> {
  @ApiProperty({
    example: '1',
    description: 'Uniq id',
  })
  @Column({
    type: INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: '1',
    description: 'unique buyer identifier',
  })
  @ForeignKey(() => User)
  @Column({ type: INTEGER })
  userId: number;

  @ApiProperty({
    example: '1',
    description: 'unique track identifier',
  })
  @ForeignKey(() => Track)
  @Column({ type: INTEGER })
  trackId: number;

  @BelongsTo(() => User)
  user: User;

  @BelongsTo(() => Track)
  post: Track;
}
