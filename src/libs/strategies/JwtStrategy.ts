import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { ServerConfig } from "#infrastructure/config/ServerConfig";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: ServerConfig.ACCESS_TOKEN_SECRET,
        });
    }

    async validate(payload: unknown) {
        return payload;
    }
}