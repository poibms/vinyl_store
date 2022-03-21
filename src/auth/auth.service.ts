import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/user.model';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  // async validateUser(username: string, password: string): Promise<User | null> {
  //   const user = await this.userService.findUserByEmail(username);
  //   if (user && user.password === password) return user;
  //   return null;
  // }

  async login(user: User) {
    return {
      access_token: this.jwtService.sign({
        id: user.id,
        email: user.email,
        role: user.role,
      }),
    };
  }

  async signInWithGoogle(data: any) {
    if (!data.user) throw new BadRequestException();
    let user = await this.userService.findByGoogleId(data.user.googleId);
    if (user) return this.login(user);

    user = await this.userService.findUserByEmail(data.user.email);
    if (user)
      throw new ForbiddenException(
        "User already exists, but Google account was not connected to user's account",
      );
    try {
      const { email, firstName, lastName, avatar, googleId } = data.user;
      const checkCountOfUsers = await this.userService.getCountOfUsers();
      if (checkCountOfUsers === 0) {
        const admin = await this.userService.createUser({
          email,
          firstName,
          lastName,
          avatar,
          googleId,
          role: 'ADMIN',
        });
        return this.login(admin);
      } else {
        const defaultUser = await this.userService.createUser({
          email,
          firstName,
          lastName,
          avatar,
          googleId,
          role: 'USER',
        });
        return this.login(defaultUser);
      }
    } catch (e) {
      throw new Error(e);
    }
  }
}
