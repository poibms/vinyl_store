import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'email@gmail.com', description: 'user email' })
  @IsString({ message: 'must be a string' })
  email: string;
  @ApiProperty({ example: 'John', description: 'user first name' })
  @IsString({ message: 'must be a string' })
  firstName: string;
  @ApiProperty({ example: 'Sena', description: 'user last name' })
  @IsString({ message: 'Должно быть строкой' })
  lastName: string;
  @ApiProperty({
    example: '563473284421748972',
    description: 'User google id, google api will return it',
  })
  googleId: string;
  @ApiProperty({ example: 'johnsena.jpg', description: 'User profile picture' })
  avatar: string;
  @ApiProperty({ example: 'USER', description: 'Your role in this service' })
  role: string;
}
