import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOAuth2, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from '../user/user.model';
import { AuthService } from './auth.service';

@Controller('auth')
@ApiTags('Login')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Req() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(AuthGuard('google'))
  @ApiOAuth2(['google'])
  @Get('google')
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async signInWithGoogle() {}

  @ApiOperation({ summary: 'Create default user' })
  @ApiResponse({ status: 200, type: User })
  @UseGuards(AuthGuard('google'))
  @Get('google/redirect')
  async signInUserWithGoogleRedirect(@Req() req) {
    return this.authService.signInWithGoogle(req);
  }

  // @ApiOperation({ summary: 'Create admin' })
  // @ApiResponse({ status: 200, type: User })
  // @UseGuards(AuthGuard('google'))
  // @Get('google/redirect/admin')
  // async signInAdminWithGoogleRedirect(@Req() req) {
  //   return this.authService.signInWithGoogle(req, 'ADMIN');
  // }
}
