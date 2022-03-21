import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { FileModule } from 'src/file/file.module';
import { TrackController } from './track.controller';
import { Track } from './models/track.model';
import { TrackService } from './track.service';
import { Review } from './models/review.model';
import { AuthModule } from 'src/auth/auth.module';
import { BasketModule } from 'src/basket/basket.module';
import { MailModule } from 'src/mail/mail.module';

@Module({
  controllers: [TrackController],
  imports: [
    SequelizeModule.forFeature([Track, Review]),
    forwardRef(() => AuthModule),
    FileModule,
    BasketModule,
    MailModule,
  ],
  providers: [TrackService],
  exports: [TrackService],
})
export class TrackModule {}
