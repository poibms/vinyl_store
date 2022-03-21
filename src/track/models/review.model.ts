import { ApiProperty } from '@nestjs/swagger';
import { INTEGER } from 'sequelize';
import { STRING } from 'sequelize';
import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from '../../user/user.model';
import { Track } from './track.model';

@Table({ tableName: 'review' })
export class Review extends Model<Review> {
  @ApiProperty({
    example: '2',
    description: 'Id of the track the review is associated with',
  })
  @Column({ type: INTEGER, allowNull: false })
  @ForeignKey(() => Track)
  trackId: number;

  @ApiProperty({
    example: '1',
    description: 'User Id of the person who left this review',
  })
  @Column({ type: INTEGER, allowNull: false })
  @ForeignKey(() => User)
  userId: number;

  @ApiProperty({
    example: '5',
    description: 'The rating of the record that the user has set for it',
  })
  @Column({ type: INTEGER, allowNull: false })
  rating: number;

  @ApiProperty({
    example: 'great song, I listened to it while riding the bus to school',
    description: 'user commentary on the record',
  })
  @Column({ type: STRING, allowNull: false })
  comment: string;

  @BelongsTo(() => Track)
  track: Track;

  @BelongsTo(() => User)
  user: User;
}
