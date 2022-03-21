import {
  Body,
  Controller,
  Get,
  Put,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UpdateDto } from './dto/updateDto';
import { User } from './user.model';
import { UserService } from './user.service';

@Controller('user')
@ApiTags('User')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiOperation({ summary: 'update your profile info' })
  @ApiResponse({ status: 200, type: User })
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('avatar'))
  @ApiBearerAuth('JWT')
  @Put('/updateprofile')
  public async updateProfile(
    @Req() req,
    @Body() payload: UpdateDto,
    @UploadedFile() avatar: any,
  ) {
    const { id } = req.user;
    return this.userService.updateProfile(id, payload, avatar);
  }

  @ApiOperation({ summary: 'this route will return your profile' })
  @ApiResponse({ status: 200, type: User })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT')
  @Get('/profile')
  public getProfile(@Req() req) {
    const { id } = req.user;
    return this.userService.findById(id);
  }
}
