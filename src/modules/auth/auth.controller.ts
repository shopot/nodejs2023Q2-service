import {
  BadRequestException,
  Body,
  Controller,
  ForbiddenException,
  HttpCode,
  InternalServerErrorException,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { StatusCodes } from 'http-status-codes';

import { AuthService } from './auth.service';
import { AuthUserDto } from './dto/auth-user.dto';
import { TransformInterceptor } from '../../common/interceptors';
import { AppForbiddenError, AppBadRequestError } from '../../common/exceptions';
import { AuthRefreshGuard } from '../../common/guards';
import { AuthPayloadDto } from './dto/auth-payload.dto';
import { Public } from '../../common/decorators';

@Controller('auth')
@UseInterceptors(TransformInterceptor)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('signup')
  @HttpCode(StatusCodes.CREATED)
  async signup(@Body() { login, password }: AuthUserDto) {
    try {
      return await this.authService.signUp(login, password);
    } catch (err) {
      if (err instanceof AppBadRequestError) {
        throw new BadRequestException();
      }

      throw new InternalServerErrorException();
    }
  }

  @Public()
  @Post('login')
  @HttpCode(StatusCodes.OK)
  async login(@Body() { login, password }: AuthUserDto) {
    try {
      return await this.authService.signIn(login, password);
    } catch (err) {
      if (err instanceof AppForbiddenError) {
        throw new ForbiddenException();
      }

      throw new InternalServerErrorException();
    }
  }

  @Public()
  @UseGuards(AuthRefreshGuard)
  @HttpCode(StatusCodes.OK)
  @Post('refresh')
  async refresh(@Body() { id, login }: AuthPayloadDto) {
    try {
      return await this.authService.refresh(id, login);
    } catch {
      throw new InternalServerErrorException();
    }
  }
}
