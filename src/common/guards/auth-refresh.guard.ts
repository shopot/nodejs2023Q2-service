import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthRefreshGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const token = this.extractTokenFromBody(request);

    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get('auth.refreshSecret'),
      });

      const { sub: id, username: login } = payload;

      request.body['id'] = id;

      request.body['login'] = login;
    } catch {
      throw new UnauthorizedException();
    }

    return true;
  }

  private extractTokenFromBody(request: Request): string | undefined {
    const { refreshToken } = request.body;

    return refreshToken;
  }
}
