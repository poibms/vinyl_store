import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './user/user.model';
import { UserModule } from './user/user.module';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { FileModule } from './file/file.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TrackModule } from './track/track.module';
import * as path from 'path';
import { Track } from './track/models/track.model';
import { Review } from './track/models/review.model';
import { BasketModule } from './basket/basket.module';
import { Basket } from './basket/basket.model';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env`,
    }),
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, 'static'),
    }),
    // SequelizeModule.forRoot({
    //   database: process.env.DATABASE_URL,
    //   dialect: 'postgres',
    //   models: [User, Track, Review, Basket],
    // }),
    // DATABASE_URL=postgres://tabjhbnkftswlo:21b3ef1b1659f01d88fa1e139e72c82a414a18a64990f51285fb997a2f41bc98@ec2-54-74-160-149.eu-west-1.compute.amazonaws.com:5432/d11r6e6qp43f2q

    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      models: [User, Track, Review, Basket],
      autoLoadModels: true,
      synchronize: true,
    }),
    MailerModule.forRoot({
      transport: {
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        secure: false,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD,
        },
      },
    }),
    UserModule,
    AuthModule,
    FileModule,
    TrackModule,
    BasketModule,
    MailModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AppModule {}
