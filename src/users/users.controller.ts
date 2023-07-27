import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  HttpCode,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import { StatusCodes } from 'http-status-codes';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UuidDto } from '../common/dto';
import { User } from './entities/user.entity';
import {
  AuthErrorException,
  HttpForbiddenException,
  HttpNotFoundException,
  HttpServerErrorException,
  NotFoundErrorException,
} from '../common/exceptions';
import { HttpExceptionFilter } from '../common/filters';
import { TransformInterceptor } from '../common/interceptors';

@Controller('user')
@ApiTags('user')
@UseFilters(new HttpExceptionFilter())
@UseInterceptors(new TransformInterceptor())
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  @ApiBody({
    type: CreateUserDto,
    description: 'A login and password for the new user',
  })
  @ApiCreatedResponse({
    description: 'The user has been successfully created.',
    type: User,
  })
  @ApiBadRequestResponse({
    description: 'Request body does not contain required fields',
  })
  create(@Body() createUserDto: CreateUserDto): User {
    return this.userService.create(createUserDto);
  }

  @Get()
  @ApiOkResponse({
    description: 'A users has been successfully fetched',
    type: [User],
  })
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Should be an id of a user that exists in the database',
    type: 'string',
  })
  @ApiOkResponse({
    description: 'A user has been successfully fetched',
    type: User,
  })
  @ApiBadRequestResponse({
    description: 'A user with given id is invalid (not uuid).',
  })
  @ApiNotFoundResponse({
    description: 'A user with given id does not exist.',
  })
  findOne(@Param() { id }: UuidDto) {
    try {
      return this.userService.findOne(id);
    } catch (err) {
      if (err instanceof NotFoundErrorException) {
        throw new HttpNotFoundException();
      }

      throw new HttpServerErrorException();
    }
  }

  @Put(':id')
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Should be an id of a user that exists in the database',
    type: 'string',
  })
  @ApiBody({ type: UpdateUserDto, description: 'A new password for the user' })
  @ApiOkResponse({
    description: 'A user has been successfully updated',
    type: User,
  })
  @ApiBadRequestResponse({
    description: 'A user with given id is invalid (not uuid).',
  })
  @ApiNotFoundResponse({ description: 'A user with given id does not exist.' })
  update(@Param() { id }: UuidDto, @Body() updateUserDto: UpdateUserDto) {
    try {
      return this.userService.update(id, updateUserDto);
    } catch (err) {
      if (err instanceof NotFoundErrorException) {
        throw new HttpNotFoundException();
      } else if (err instanceof AuthErrorException) {
        throw new HttpForbiddenException();
      }

      throw new HttpServerErrorException();
    }
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Should be an id of a user that exists in the database',
    type: 'string',
  })
  @ApiNoContentResponse({ description: 'A user has been successfully deleted' })
  @ApiBadRequestResponse({
    description: 'A user with given id is invalid (not uuid).',
  })
  @ApiNotFoundResponse({ description: 'A user with given id does not exist.' })
  @HttpCode(StatusCodes.NO_CONTENT)
  remove(@Param() { id }: UuidDto) {
    try {
      return this.userService.remove(id);
    } catch (err) {
      if (err instanceof NotFoundErrorException) {
        throw new HttpNotFoundException();
      }

      throw new HttpServerErrorException();
    }
  }
}
