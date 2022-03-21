import { ApiProperty } from '@nestjs/swagger';

export class CreateTrackDto {
  @ApiProperty({ example: 'Queen', description: 'Auhtor name of this record' })
  authorName: string;
  @ApiProperty({
    example: 'We will rock you',
    description: 'Name of the record',
  })
  name: string;
  @ApiProperty({
    example:
      'Rock you means to shake you, to make you think again, to dissemble the pride you think it is worth holding on to',
    description: 'record description',
  })
  descriptiom: string;
  @ApiProperty({
    example: '12$',
    description: 'the price for which you can buy this record',
  })
  price: number;
  // @ApiProperty({
  //   example: 'queenwewillrockyou.jpg',
  //   description: 'record image',
  // })
  // image: string;
  // @ApiProperty({ example: 'wewillrockyou.mp3', description: 'the song' })
  // audio: string;
}
