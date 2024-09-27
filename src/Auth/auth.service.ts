import { Injectable, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt'; // Correcting the import for JwtService
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly jwtService: JwtService, 
  ) {}

 
  async ValidateOrCreateUser(googleId: string, userDto: AuthDto) {
    try {
      console.log(googleId);

      
      const user = await this.databaseService.user.findUnique({
        where: { googleId },
      });


      if (!user) {
        const newUser = await this.databaseService.user.create({
          data: {
            googleId,
            username: userDto.username,
            email: userDto.email,
            profilePic: userDto.profilePic,
          },
        });


        const token = this.generateJwtToken(newUser);

        return { user: newUser, token };
      }


      const token = this.generateJwtToken(user);
      return { user, token };
    } catch (error) {
      console.error('Error in ValidateOrCreateUser:', error);
      throw new InternalServerErrorException('Failed to validate or create user');
    }
  }

  
   generateJwtToken(user: any) {
    const payload = { userId: user.id, username: user.username, email: user.email };
    return this.jwtService.sign(payload);
  }
}
