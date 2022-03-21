import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { FileService, FileType } from '../file/file.service';
import { Review } from '../track/models/review.model';
import { Track } from '../track/models/track.model';
import { Basket } from '../basket/basket.model';
import { CreateUserDto } from './dto/createUserDto';
import { UpdateDto } from './dto/updateDto';
import { User } from './user.model';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    private fileService: FileService,
  ) {}

  public async createUser(userPayload: CreateUserDto): Promise<User> {
    // console.log(userPayload);
    const user = await this.userRepository.create(userPayload);
    return user;
  }

  public async findByGoogleId(googleId: string): Promise<User | undefined> {
    const user = await this.userRepository.findOne({ where: { googleId } });
    return user;
  }

  public async findById(id: number): Promise<User | undefined> {
    const user = await this.userRepository.findOne({
      where: { id },
      include: [Review, { model: Basket, include: [Track] }],
    });
    return user;
  }

  public async findUserByEmail(email: string): Promise<User | undefined> {
    const user = await this.userRepository.findOne({ where: { email } });
    return user;
  }

  public async getCountOfUsers(): Promise<number> {
    const user = await this.userRepository.findAndCountAll();
    return user.count;
  }

  public async updateProfile(
    id: number,
    payload: UpdateDto,
    avatar: any,
  ): Promise<User> {
    const imageName = await this.fileService.createFile(
      FileType.AVATAR,
      avatar,
    );
    await this.userRepository.update(
      { ...payload, avatar: imageName },
      { where: { id } },
    );
    const updatedUser = await this.findById(id);
    return updatedUser;
  }
}
