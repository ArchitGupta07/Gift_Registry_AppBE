import { PassportStrategy } from "@nestjs/passport";
import { Strategy,VerifyCallback } from "passport-google-oauth20";
import { Injectable } from "@nestjs/common";
import { AuthService } from "../auth.service";
import { ConfigService } from "@nestjs/config";


@Injectable()
export class GoogleStrategies extends PassportStrategy(Strategy,'google'){
    
    constructor(private Authservice: AuthService,private configService: ConfigService){
        super({
            clientID: configService.get<string>('GOOGLE_CLIENT_ID'),  // Use ConfigService to get clientID
            clientSecret: configService.get<string>('GOOGLE_CLIENT_SECRET'),
            callbackURL: configService.get<string>('GOOGLE_CALLBACK_URL'),
            scope: ['email', 'profile'],
        });
    }

async validate(
    _accessToken: string,
    _refreshToken: string,
    profile: any,
    done: VerifyCallback
):Promise<any>{


    const {id,name,emails,photos} = profile;
    const user ={
        providerId: id,
        googleId: profile.id,
        username: `${name.givenName }`,
        email: emails[0].value,
        profilePic: photos[0].value,
    };

   
    done( null, user);
}

}