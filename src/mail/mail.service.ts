import { ApiOperation,ApiResponse,ApiTags } from '@nestjs/swagger';
import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@ApiTags('Mail')
@Injectable()
export class CustomMailerService {
  constructor(private mailerService: MailerService) {}
@ApiOperation({summary: 'Send a welcome email'})
@ApiResponse({status: 200, description: 'Email sent Successfully'})
@ApiResponse({status: 500, description: 'Internal server error'})
  async sendWelcomeEmail(email: string, username: string) {
    
    const subject = 'Welcome to PresentPal!';
    
    const message = `
      <p>Dear ${username},</p>
      <p>Welcome to <strong>PresentPal</strong>! We are thrilled to have you as part of our community.</p>
      <p>PresentPal is designed to make event planning and gift management easy and enjoyable. Whether you're organizing a party or setting up a gift registry, we are here to ensure you have a seamless experience.</p>
      <p>If you need any assistance or have questions, don't hesitate to reach out to our support team. We're always here to help.</p>
      <p>Thank you for choosing PresentPal, and we look forward to being a part of your memorable moments!</p>
      <p>Best regards,</p>
      <p><strong>The PresentPal Team</strong></p>
      <p><a href="https://www.presentpal.com">www.presentpal.com</a></p>
      <p><small>If you didn’t create an account on PresentPal, please ignore this email.</small></p>
    `;

    try {
        await this.mailerService.sendMail({
            to: email,
            subject: subject,
            html: message,
          });
          console.log('Email send successfully');
    }
   catch(error){
   console.log('Error sending Email:',error);
   }
  }

}
