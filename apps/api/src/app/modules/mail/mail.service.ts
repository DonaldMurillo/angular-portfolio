import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';


@Injectable()
export class MailService {
  constructor (private mailerService: MailerService) {}

  async sendEmail(receiver: string, subject: string, variables: string[]) {
    await this.mailerService.sendMail({
      to: receiver,
      // from: '"Support Team" <support@example.com>', // override default from
      subject: subject,
      //template: './test', // `.hbs` extension is appended automatically
      //context: { // ✏️ filling curly brackets with content
      //  test: test,
      //},
      html: `this is <h1> an <strong> ugly</strong> email without template to ${variables[0]} ${variables[1]} ${variables[2]} ${variables[3]} ${variables[4]} ${variables[5]} ${variables[6]} ${variables[7]} </h1>`,
    });
  }
}
