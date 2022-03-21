import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';

@Injectable()
export class MailService {
  constructor(
    private mailService: MailerService,
    private userService: UserService,
  ) {}

  async paymentNotify(id: number) {
    const user = await this.userService.findById(id);
    await this.mailService
      .sendMail({
        to: user.email,
        from: process.env.SMTP_USER,
        subject: 'Payments notify',
        text: '',
        html: `<h1>Hi ${user.firstName}</h1>
    <p>Thanks for using our service</p>`,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((e) => {
        console.error(e);
      });
  }
}
