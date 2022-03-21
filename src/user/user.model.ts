import { ApiProperty } from '@nestjs/swagger';
import { STRING } from 'sequelize';
import { Column, HasMany, Model, Table } from 'sequelize-typescript';
import { Basket } from '../basket/basket.model';
import { Review } from '../track/models/review.model';

@Table({ tableName: 'user' })
export class User extends Model<User> {
  @ApiProperty({ example: 'email@gmail.com', description: 'User email' })
  @Column({ type: STRING, unique: true, allowNull: false })
  email: string;
  @ApiProperty({ example: 'John', description: 'User first name' })
  @Column({ type: STRING, allowNull: false })
  firstName: string;
  @ApiProperty({ example: 'Cena', description: 'User last name' })
  @Column({ type: STRING, allowNull: false })
  lastName: string;
  @ApiProperty({
    example: '563473284421748972',
    description: 'User google id, google api will return it',
  })
  @Column({ type: STRING, allowNull: false })
  googleId: string;
  @ApiProperty({ example: 'johnsena.jpg', description: 'User profile picture' })
  @Column({ type: STRING, allowNull: false })
  avatar: string;
  @ApiProperty({ example: 'USER', description: 'Your role in this service' })
  @Column({ type: STRING, allowNull: false })
  role: string;

  @HasMany(() => Review)
  myReviews: Review[];

  @HasMany(() => Basket)
  myTracks: Basket[];

  // @HasMany(() => Likes)
  // userLikes: Likes[];
}
