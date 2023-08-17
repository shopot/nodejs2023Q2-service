import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcrypt';
import { ConfigService } from '@nestjs/config';

import { SALT_OR_ROUNDS } from '../../common/constants';
import { UsersService } from '../users/users.service';
import { AppForbiddenError, AppBadRequestError } from '../../common/exceptions';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async signUp(username: string, pass: string) {
    try {
      return await this.usersService.create({
        login: username,
        password: pass,
      });
    } catch {
      throw new AppBadRequestError();
    }
  }

  async signIn(username: string, pass: string): Promise<any> {
    const { id, login, password } = await this.usersService.findByLogin(
      username,
    );

    const isPasswordMatching = await this.verifyPassword(pass, password);

    if (!isPasswordMatching) {
      throw new AppForbiddenError();
    }

    return await this.createAuthTokens(id, login);
  }

  async refresh(id: string, login: string) {
    return await this.createAuthTokens(id, login);
  }

  async hashPassword(plainTextPassword: string) {
    return await hash(plainTextPassword, SALT_OR_ROUNDS);
  }

  async verifyPassword(plainTextPassword: string, hashedPassword: string) {
    return await compare(plainTextPassword, hashedPassword);
  }

  private async createAuthTokens(id: string, login: string) {
    const accessToken = await this.createAccessToken(id, login);

    const refreshToken = await this.createRefreshToken(id, login);

    return {
      accessToken,
      refreshToken,
    };
  }

  private async createAccessToken(id: string, login: string) {
    const payload = { sub: id, username: login };

    return await this.jwtService.signAsync(payload, {
      secret: this.configService.get('auth.accessSecret'),
      expiresIn: this.configService.get('auth.accessExpiresIn'),
    });
  }

  private async createRefreshToken(id: string, login: string) {
    const payload = { sub: id, username: login };

    return await this.jwtService.signAsync(payload, {
      secret: this.configService.get('auth.refreshSecret'),
      expiresIn: this.configService.get('auth.refreshExpiresIn'),
    });
  }
}
