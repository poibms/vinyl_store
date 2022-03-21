import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateDto {
  @ApiProperty({ example: 'John', description: 'user first name' })
  @IsString({ message: 'must be a string' })
  firstName: string;
  @ApiProperty({ example: 'Sena', description: 'user last name' })
  @IsString({ message: 'must be a string' })
  lastName: string;
  @ApiProperty({ example: 'johnsena.jpg', description: 'User profile picture' })
  avatar: string;
}
