import { forwardRef } from '@nestjs/common';
import { getModelToken, SequelizeModule } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthModule } from '../auth/auth.module';
import { BasketModule } from '../basket/basket.module';
import { FileModule } from '../file/file.module';
import { MailModule } from '../mail/mail.module';
import { MailService } from '../mail/mail.service';
import { User } from '../user/user.model';
import { Review } from './models/review.model';
import { Track } from './models/track.model';
import { TrackController } from './track.controller';
import { TrackService } from './track.service';

describe('Track Controller', () => {
  let controller: TrackController;
  const mockTrackService = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TrackController],
      imports: [
        forwardRef(() => AuthModule),
        // SequelizeModule.forFeature([Track, Review]),
        // FileModule,
        // BasketModule,
        // MailModule,
      ],
      providers: [
        TrackService,
        {
          provide: getModelToken(Track),
          useValue: { create: jest.fn(), save: jest.fn() },
        },
        {
          provide: getModelToken(Review),
          useValue: { create: jest.fn(), save: jest.fn() },
        },
        {
          provide: getModelToken(User),
          useValue: { create: jest.fn(), save: jest.fn() },
        },
      ],
    })
      .overrideProvider(TrackService)
      .useValue(mockTrackService)
      .compile();

    controller = module.get<TrackController>(TrackController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
