import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { MailService } from './mail.service';

@Module({
  providers: [MailService],
  imports: [UserModule],
  exports: [MailService],
})
export class MailModule {}
