import { Injectable } from "@nestjs/common";
import {AuthDto} from './dto/auth.dto';
import { DatabaseService } from "src/database/database.service";


@Injectable()
export class authService{

    constructor(private readonly databaseService : DatabaseService) {}

    async ValidateOrCreateUser(googleId: string,userDto: AuthDto){
        console.log(googleId);
    
        const user = await this.databaseService.user.findUnique({
            where: {googleId},
        });

        if(!user){
            return await this.databaseService.user.create({
                data: {
                    googleId,
                    username: userDto.username,
                    email: userDto.email,
                    profilePic: userDto.profilePic,
                },
            });
        
        }
        console.log(user.profilePic);
return user;
    }
   
}