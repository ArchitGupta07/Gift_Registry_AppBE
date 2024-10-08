import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { CustomMailerService } from './mail.service'; 
import { MailController } from './mail.controller';

@Module({
  imports: [
    MailerModule.forRoot({
      
      transport: {
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      },
      defaults: {
        from: ' "No Reply" <noreply@gmail.com'
      }
    }),
  ],
  providers: [CustomMailerService],
  controllers: [MailController],
  exports: [CustomMailerService], 
})
export class MailModule {}
