import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  HttpCode,
  UseInterceptors,
  ForbiddenException,
  NotFoundException,
  InternalServerErrorException,
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
import { UuidDto } from '../../common/dto';
import { User } from './entities/user.entity';
import { AppForbiddenError, AppNotFoundError } from '../../common/exceptions';
import { TransformInterceptor } from '../../common/interceptors';

@Controller('user')
@ApiTags('user')
@UseInterceptors(TransformInterceptor)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

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
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      return await this.usersService.create(createUserDto);
    } catch {
      throw new InternalServerErrorException();
    }
  }

  @Get()
  @ApiOkResponse({
    description: 'A users has been successfully fetched',
    type: [User],
  })
  async findAll() {
    return await this.usersService.findAll();
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
  async findOne(@Param() { id }: UuidDto) {
    try {
      return await this.usersService.findOne(id);
    } catch (err) {
      if (err instanceof AppNotFoundError) {
        throw new NotFoundException();
      }

      throw new InternalServerErrorException();
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
  async update(@Param() { id }: UuidDto, @Body() updateUserDto: UpdateUserDto) {
    try {
      return await this.usersService.update(id, updateUserDto);
    } catch (err) {
      if (err instanceof AppNotFoundError) {
        throw new NotFoundException();
      } else if (err instanceof AppForbiddenError) {
        throw new ForbiddenException();
      }

      throw new InternalServerErrorException();
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
  async remove(@Param() { id }: UuidDto) {
    try {
      return await this.usersService.remove(id);
    } catch (err) {
      if (err instanceof AppNotFoundError) {
        throw new NotFoundException();
      }

      throw new InternalServerErrorException();
    }
  }
}
