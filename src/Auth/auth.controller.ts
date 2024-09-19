import { Controller, UseGuards,Get,Post, Req, Res } from "@nestjs/common";
import { authService } from "./auth.service";
import { AuthGuard } from "@nestjs/passport";
import {Request,Response} from "express";
//import { AuthDto } from "./dto/auth.dto";
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: authService) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req: Request) {
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req: any,@Res() res: Response) {
    
    const user = await this.authService.ValidateOrCreateUser(
      req.user.user.googleId,
      req.user.user
    );
    // return new AuthDto(user);
    const redirectUrl = `http://localhost:3000/dashboard?username=${encodeURIComponent(user.username)}&email=${encodeURIComponent(user.email)}&profilePic=${encodeURIComponent(user.profilePic)}`;
    res.redirect(redirectUrl);
  }
}