import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../../users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private usersService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('auth.jwtSecret'),
    });
  }

  async validate(payload: any) {
    const user = await this.usersService.findOne(parseInt(payload.sub, 10));
    
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    
    // We return a user object which will be attached to the request
    return { 
      id: user.id,
      email: user.email,
      role: user.role,
    };
  }
} 