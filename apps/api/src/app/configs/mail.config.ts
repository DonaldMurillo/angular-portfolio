import { MailerOptions } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';

console.log(join(__dirname, '/assets/mailer/templates'));
export const mailConfig = (config: ConfigService): MailerOptions | Promise<MailerOptions> => ({
  //transport: config.get('MAIL_TRANSPORT'),

  transport: {
    host: config.get('MAIL_HOST'),
    secure: false,
    auth: {
      user: config.get('MAIL_USER'),
      pass: config.get('MAIL_PASSWORD'),
    },
  },
  defaults: {
    from: `"No Reply Goin Travel" <${config.get('MAIL_FROM')}>`,
  },
  template: {
    dir: join(__dirname, '/assets/mailer/templates'),

    adapter: new HandlebarsAdapter(),
    options: {
      strict: true,
    },
  },
});
