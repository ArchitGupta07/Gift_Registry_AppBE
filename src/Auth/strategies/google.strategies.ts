import { PassportStrategy } from "@nestjs/passport";
import { Strategy,VerifyCallback } from "passport-google-oauth20";
import { Injectable } from "@nestjs/common";
import { authService } from "../auth.service";


@Injectable()
export class GoogleStrategies extends PassportStrategy(Strategy,'google'){
    constructor(private Authservice: authService){
        super({
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.GOOGLE_CALLBACK_URL,
            scope: ['email','profile'],
        });
    }

async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback
):Promise<any>{
    const {name,emails,photos} = profile;
    const user ={
        googleId: profile.id,
        username: name.givenName,
        email: emails[0].value,
        profilePic: photos[0].value,
    };

    const payload = {
        user, 
        accessToken,
    };
    done( null, payload);
}

}