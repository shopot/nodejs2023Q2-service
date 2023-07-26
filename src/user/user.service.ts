import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { BaseRepository } from '../common/database/base-repository';
import { User } from './entities/user.entity';
import { NotFoundException, ForbiddenException } from '../common/exceptions';

@Injectable()
export class UserService {
  private userDb: BaseRepository<User>;

  constructor() {
    this.userDb = new BaseRepository<User>();
  }

  create({ login, password }: CreateUserDto): User {
    const user = new User({
      id: uuidv4(),
      login,
      password,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    return this.userDb.create(user);
  }

  findAll() {
    return this.userDb.find();
  }

  findOne(id: string) {
    const foundUser = this.userDb.findOneBy({ id });

    if (foundUser === null) {
      throw new NotFoundException();
    }

    return foundUser;
  }

  update(id: string, { oldPassword, newPassword }: UpdateUserDto) {
    const foundUser = this.userDb.findOneBy({ id });

    if (foundUser === null) {
      throw new NotFoundException();
    }

    const { password: currentPassword } = foundUser;

    if (currentPassword !== oldPassword) {
      throw new ForbiddenException();
    }

    const updatedUser = new User({
      ...foundUser,
      password: newPassword,
      updatedAt: Date.now(),
      version: foundUser.version + 1,
    });

    return this.userDb.update(id, updatedUser);
  }

  remove(id: string) {
    if (!this.userDb.has(id)) {
      throw new NotFoundException();
    }

    return this.userDb.remove({ id });
  }
}
