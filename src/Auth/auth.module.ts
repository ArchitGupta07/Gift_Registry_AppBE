import { Module } from "@nestjs/common";
import { AuthController } from "./Auth.controller";
import { AuthService } from "./auth.service";
import { GoogleStrategies } from "./strategies/google.strategies";
import { PassportModule } from "@nestjs/passport";
import { DatabaseModule } from "src/database/database.module";
import { UserModule } from "src/users/users.module"
import { JwtModule } from "@nestjs/jwt";
import * as dotenv from 'dotenv';
dotenv.config();
@Module({
    imports: [PassportModule,DatabaseModule , UserModule, JwtModule.register({
        secret:process.env.JWT_SECRET, 
        signOptions: { expiresIn: '1h' }, 
      }),],
    controllers: [AuthController],
    providers:[AuthService,GoogleStrategies],
})
export class AuthModule
{

}