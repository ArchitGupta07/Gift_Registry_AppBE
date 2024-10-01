import { Controller, Get, UseGuards, Req, Res, HttpStatus } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { AuthService } from './auth.service'; 
import { AuthDto } from './dto/auth.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import * as dotenv from 'dotenv';

dotenv.config();

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

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
        req.user.googleId,
        req.user,
      );
  
      if (!user) {
        throw new Error('User creation failed');
      }
  
      
      const userDto = new AuthDto(user);
    
  
      const redirectUrl = `${process.env.FRONTEND_URL}/dashboard?user=${encodeURIComponent(
        JSON.stringify(userDto),
      )}&token=${token}`;
  
  
      res.redirect(redirectUrl);
    } catch (error) {
      console.error('Error handling Google callback:', error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send('Internal Server Error');
    }
  }

 
}
