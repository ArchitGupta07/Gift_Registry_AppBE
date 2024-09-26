import { Controller, Get, UseGuards, Req, Res, HttpStatus } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { authService } from './auth.service'; // Correct import statement
import { AuthDto } from './dto/auth.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly AuthService: authService) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  @ApiOperation({ summary: 'Google OAuth2 login redirect' })
  @ApiResponse({ status: 302, description: 'Redirects to Google login page' })
  async googleAuth(@Req() req: Request) {
    // Passport handles the redirection to Google's login page
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  @ApiOperation({
    summary: 'Google OAuth2 callback',
    description: 'Handles the Google OAuth2 callback and redirects with user data.'
  })
  @ApiResponse({
    status: 302,
    description: 'Redirects to the dashboard with user data in the query params.'
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error if user creation fails.'
  })
  async googleAuthRedirect(@Req() req: any, @Res() res: Response) {
    try {
      // Validate or create user
      const userReq = req.user;
      const user = await this.AuthService.ValidateOrCreateUser(
        userReq.user.googleId,
        userReq.user
      );

      // Check if the user was created successfully
      if (!user) {
        throw new Error('User creation failed');
      }

      // User data to send
      const userDto = new AuthDto(user);
      
      // Redirect URL with user data (Consider using sessions or JWT instead)
      const redirectUrl = `http://localhost:3000/dashboard?user=${encodeURIComponent(JSON.stringify(userDto))}`;
      console.log(userDto.profilePic, userDto.email, userDto.username);
      
      res.redirect(redirectUrl);
    } catch (error) {
      console.error('Error handling Google callback:', error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send('Internal Server Error');
    }
  }
}
