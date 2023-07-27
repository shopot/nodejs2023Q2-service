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

@Injectable()
export class UsersService {
  constructor(private databaseService: DatabaseService) {}

  create({ login, password }: CreateUserDto): User {
    const user = new User({
      id: uuidv4(),
      login,
      password,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    return this.databaseService.users.create(user);
  }

  findAll() {
    return this.databaseService.users.find();
  }

  findOne(id: string) {
    const foundUser = this.databaseService.users.findOneBy({ id });

    if (foundUser === null) {
      throw new NotFoundErrorException();
    }

    return foundUser;
  }

  update(id: string, { oldPassword, newPassword }: UpdateUserDto) {
    const foundUser = this.databaseService.users.findOneBy({ id });

    if (foundUser === null) {
      throw new NotFoundErrorException();
    }

    const { password: currentPassword } = foundUser;

    if (currentPassword !== oldPassword) {
      throw new AuthErrorException();
    }

    const updatedUser = new User({
      ...foundUser,
      password: newPassword,
      updatedAt: Date.now(),
      version: foundUser.version + 1,
    });

    return this.databaseService.users.update(id, updatedUser);
  }

  remove(id: string) {
    if (!this.databaseService.users.has(id)) {
      throw new NotFoundErrorException();
    }

    return this.databaseService.users.remove({ id });
  }
}
