import { Controller, Get, UseGuards, Req, Res, HttpStatus } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { authService } from './auth.service'; // Correct import statement
import { AuthDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly AuthService: authService) {} // Correct constructor parameter name

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req: Request) {
    // Passport handles the redirection to Google's login page
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req: any, @Res() res: Response) {
    try {
      // Validate or create user
      const userReq = req.user;
      const user = await this.AuthService.ValidateOrCreateUser(
        userReq.user.googleId,
        userReq.user
      );

      // User data to send
      const userDto = new AuthDto(user);

      // Redirect to the profile page with user data as query parameter
      const redirectUrl = `http://localhost:3000/dashboard?user=${encodeURIComponent(JSON.stringify(userDto))}`;
      console.log(userDto.profilePic,userDto.email,userDto.username);
      res.redirect(redirectUrl);
    } catch (error) {
      console.error('Error handling Google callback:', error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send('Internal Server Error');
    }
  }
}
