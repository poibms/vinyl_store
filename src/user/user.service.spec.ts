import { Test } from '@nestjs/testing';
import { getModelToken } from '@nestjs/sequelize';
import { User } from './user.model';
import { UserService } from './user.service';
import { FileModule } from '../file/file.module';
import { Track } from '../track/models/track.model';
import { Basket } from '../basket/basket.model';
import { Review } from '../track/models/review.model';
import { NUMBER } from 'sequelize';

const testUser = {
  id: 2,
  email: 'emailfortestrequest@gmail.com',
  firstName: 'Петр',
  lastName: 'Иванов',
  googleId: '104862246057184574442',
  avatar:
    'https://lh3.googleusercontent.com/a/AATXAJyA9pMBYIspFMzNuLmqywHhJqbcHgGfNuUoTPHu=s96-c',
  role: 'USER',
  createdAt: '2022-03-17T08:58:36.391Z',
  updatedAt: '2022-03-17T08:58:36.391Z',
  myReviews: [],
  myTracks: [],
};

const testPayload = {
  email: 'emailfortestrequest@gmail.com',
  firstName: 'Петр',
  lastName: 'Иванов',
  googleId: '104862246057184574442',
  avatar:
    'https://lh3.googleusercontent.com/a/AATXAJyA9pMBYIspFMzNuLmqywHhJqbcHgGfNuUoTPHu=s96-c',
  role: 'USER',
};

describe('CatsService', () => {
  let service: UserService;
  let model: typeof User;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getModelToken(User),
          useValue: {
            findAll: jest.fn(() => [testUser]),
            findOne: jest.fn(),
            create: jest.fn(() => testUser),
            update: jest.fn(),
            findAndCountAll: jest.fn(),
          },
        },
      ],
      imports: [FileModule],
    }).compile();
    service = modRef.get(UserService);
    model = modRef.get<typeof User>(getModelToken(User));
  });

  it('should get the cats', async () => {
    expect(await service.getCountOfUsers()).toEqual(0);
  });

  it('should add a user', async () => {
    expect(await service.createUser(testPayload)).toEqual(testUser);
  });

  it('should get user by id', async () => {
    const findSpy = jest.spyOn(model, 'findOne');
    expect(await service.findById(2));
    expect(findSpy).toBeCalledWith({
      where: { id: 2 },
      include: [Review, { model: Basket, include: [Track] }],
    });
  });

  it('should get a user by email', async () => {
    const findSpy = jest.spyOn(model, 'findOne');
    expect(await service.findUserByEmail('emailfortestrequest@gmail.com'));
    expect(findSpy).toBeCalledWith({
      where: { email: 'emailfortestrequest@gmail.com' },
    });
  });

  const payload = { firstName: 'safas', lastName: '', avatar: '' };
  it('should update profile', async () => {
    const findSpy = jest.spyOn(model, 'update');
    expect(await service.updateProfile(2, payload, undefined));
    expect(findSpy).toBeCalledWith(
      { ...payload, avatar: undefined },
      { where: { id: 2 } },
    );
  });
});
