import { Module } from "@nestjs/common";
import { AuthController } from "./Auth.controller";
import { authService } from "./auth.service";
import { GoogleStrategies } from "./strategies/google.strategies";
import { PassportModule } from "@nestjs/passport";
import { DatabaseModule } from "src/database/database.module";


@Module({
    imports: [PassportModule,DatabaseModule],
    controllers: [AuthController],
    providers:[authService,GoogleStrategies],
})
export class AuthModule
{

}