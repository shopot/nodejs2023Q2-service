import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import {
  NotFoundErrorException,
  AuthErrorException,
} from '../common/exceptions';
import { DatabaseService } from '../database/database.service';
import { AuthenticationService } from '../authentication/authentication.service';

@Injectable()
export class UsersService {
  constructor(
    private databaseService: DatabaseService,
    private readonly authenticationService: AuthenticationService,
  ) {}

  async create({ login, password }: CreateUserDto) {
    const user = new User({
      id: uuidv4(),
      login,
      password: await this.authenticationService.hashPassword(password),
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    return this.databaseService.users.create(user);
  }

  async findAll() {
    return this.databaseService.users.find();
  }

  async findOne(id: string) {
    const foundUser = this.databaseService.users.findOneBy({ id });

    if (foundUser === null) {
      throw new NotFoundErrorException();
    }

    return foundUser;
  }

  async update(id: string, { oldPassword, newPassword }: UpdateUserDto) {
    const foundUser = this.databaseService.users.findOneBy({ id });

    if (foundUser === null) {
      throw new NotFoundErrorException();
    }

    const { password: hashedPassword } = foundUser;

    const isPasswordMatching = await this.authenticationService.verifyPassword(
      oldPassword,
      hashedPassword,
    );

    if (!isPasswordMatching) {
      throw new AuthErrorException();
    }

    const updatedUser = new User({
      ...foundUser,
      password: await this.authenticationService.hashPassword(newPassword),
      updatedAt: Date.now(),
      version: foundUser.version + 1,
    });

    return this.databaseService.users.update(id, updatedUser);
  }

  async remove(id: string) {
    if (!this.databaseService.users.has(id)) {
      throw new NotFoundErrorException();
    }

    return this.databaseService.users.remove({ id });
  }
}
