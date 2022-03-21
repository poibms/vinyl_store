import { ApiProperty } from '@nestjs/swagger';

export class CreateReviewDto {
  @ApiProperty({
    example: '1',
    description: 'User Id of the person who left this review',
  })
  userId: number;
  @ApiProperty({
    example: '2',
    description: 'Id of the track the review is associated with',
  })
  trackId: number;
  @ApiProperty({
    example: '5',
    description: 'The rating of the record that the user has set for it',
  })
  rating: number;
  @ApiProperty({
    example: 'great song, I listened to it while riding the bus to school',
    description: 'user commentary on the record',
  })
  comment: string;
}
