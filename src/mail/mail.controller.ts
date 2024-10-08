import { Controller,Post,Body } from "@nestjs/common";
import { CustomMailerService } from "./mail.service";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('Mail')
@Controller('mail')
export class MailController{
    constructor(private readonly mailService: CustomMailerService){}

    @Post('send-welcome')
    async sendWelcomeEmail(@Body(){email,username}: {email: string; username: string;}){
        await this.mailService.sendWelcomeEmail(email,username);
    }
}