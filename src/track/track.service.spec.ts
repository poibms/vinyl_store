import { Test } from '@nestjs/testing';
import { getModelToken } from '@nestjs/sequelize';
import { FileModule } from '../file/file.module';
import { TrackService } from './track.service';
import { Track } from './models/track.model';
import { Op } from 'sequelize';
import { Review } from './models/review.model';
import { BasketModule } from '../basket/basket.module';
import { MailModule } from '../mail/mail.module';
import { MailerService } from '@nestjs-modules/mailer';

const testTrack = {
  id: 3,
  authorName: 'dfhgsdf',
  name: 'fasf',
  description: 'cvbxc',
  image: 'image/45143afa-eb16-4ae1-99a2-d09f1db689ed.jpg',
  audio: 'audio/467b6cbf-0d4a-4279-9d45-89b983e6e333.mp3',
  price: 5431,
  isSold: false,
  createdAt: '2022-03-16T08:48:37.302Z',
  updatedAt: '2022-03-16T08:48:37.302Z',
  comments: [],
};

describe('CatsService', () => {
  let service: TrackService;
  let model: typeof Track;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        TrackService,
        {
          provide: getModelToken(Track),
          useValue: {
            findAll: jest.fn(() => [testTrack]),
            findOne: jest.fn(),
            create: jest.fn(() => testTrack),
            update: jest.fn(),
            findAndCountAll: jest.fn(),
          },
        },
        {
          provide: getModelToken(Review),
          useValue: {
            findAll: jest.fn(() => [testTrack]),
            findOne: jest.fn(),
            create: jest.fn(() => testTrack),
            update: jest.fn(),
          },
        },
      ],
      imports: [FileModule, BasketModule, MailModule],
    }).compile();
    service = modRef.get(TrackService);
    model = modRef.get<typeof Track>(getModelToken(Track));
  });

  it('should search tracks by name and authorName', async () => {
    const findSpy = jest.spyOn(model, 'findAll');
    expect(await service.search('queen'));
    expect(findSpy).toBeCalledWith({
      where: {
        [Op.or]: [
          { name: 'queen' },
          { authorName: 'queen' },
          { isSold: false },
        ],
      },
    });
  });

  // it('should add a user', async () => {
  //   expect(await service.createUser(testPayload)).toEqual(testUser);
  // });

  // it('should get user by id', async () => {
  //   const findSpy = jest.spyOn(model, 'findOne');
  //   expect(await service.findById(2));
  //   expect(findSpy).toBeCalledWith({
  //     where: { id: 2 },
  //     include: [Review, { model: Basket, include: [Track] }],
  //   });
  // });

  // it('should get a user by email', async () => {
  //   const findSpy = jest.spyOn(model, 'findOne');
  //   expect(await service.findUserByEmail('emailfortestrequest@gmail.com'));
  //   expect(findSpy).toBeCalledWith({
  //     where: { email: 'emailfortestrequest@gmail.com' },
  //   });
  // });

  // const payload = { firstName: 'safas', lastName: '', avatar: '' };
  // it('should update profile', async () => {
  //   const findSpy = jest.spyOn(model, 'update');
  //   expect(await service.updateProfile(2, payload, undefined));
  //   expect(findSpy).toBeCalledWith(
  //     { ...payload, avatar: undefined },
  //     { where: { id: 2 } },
  //   );
  // });
});
