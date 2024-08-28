import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { config as dotenvConfig } from 'dotenv';

// Cargar las variables de entorno
dotenvConfig({ path: '.env' });

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID, // Usa GOOGLE_CLIENT_ID en lugar de GOOGLE_AUTH_CLIENT_ID
      clientSecret: process.env.GOOGLE_CLIENT_SECRET, // Usa GOOGLE_CLIENT_SECRET en lugar de GOOGLE_AUTH_CLIENT_SECRET
      callbackURL: process.env.GOOGLE_AUTH_CB_URL, // Asegúrate de definir esta variable en tu .env o usar una predeterminada
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    const { name, emails, photos } = profile;

    const user = {
      email: emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
      picture: photos[0].value,
      accessToken,
    };

    done(null, user);
  }
}
