import { Controller, Get, UseGuards, Req, Res, HttpStatus } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { AuthService } from './auth.service'; 
import { AuthDto } from './dto/auth.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

 import { CustomMailerService } from 'src/mail/mail.service';
import * as dotenv from 'dotenv';

dotenv.config();

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService,
   private readonly mailderService: CustomMailerService,
  ) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  @ApiOperation({ summary: 'Google OAuth2 login redirect' })
  @ApiResponse({ status: 302, description: 'Redirects to Google login page' })
  async googleAuth(@Req() req: Request) {
    
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  @ApiOperation({
    summary: 'Google OAuth2 callback',
    description: 'Handles the Google OAuth2 callback and redirects with user data.',
  })
  @ApiResponse({
    status: 302,
    description: 'Redirects to the dashboard with user data in the query params.',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error if user creation fails.',
  })
  async googleAuthRedirect(@Req() req: any, @Res() res: Response) {
    try {
      const { user, token } = await this.authService.ValidateOrCreateUser(
        req.user.password,
        req.user,
    
      );
  
      if (!user) {
        throw new Error('User creation failed');
      }
    
        await this.mailderService.sendWelcomeEmail(user.email,user.username)
      
 
      
      const userDto = new AuthDto(user);
      console.log(userDto);
      const redirectUrl = `${process.env.FRONTEND_URL}/dashboard?user=${encodeURIComponent(
        JSON.stringify(userDto),
      )}&token=${token}`;
  
     console.log(redirectUrl);
      res.redirect(redirectUrl);
    } catch (error) {
      console.error('Error handling Google callback:', error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send('Internal Server Error');
    }
  }

  private generateJwtToken(user: any) {
    const payload = { userId: user.id, username: user.username, email: user.email };
  console.log(payload);
    return this.authService.generateJwtToken(payload);
 
  }
  
}
