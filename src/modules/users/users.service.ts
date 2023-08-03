import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import {
  AuthErrorException,
  NotFoundErrorException,
} from '../../common/exceptions';
import { AuthenticationService } from '../authentication/authentication.service';
import { UserTransformer } from './transformers/user.transformer';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly authenticationService: AuthenticationService,
  ) {}

  async create({ login, password }: CreateUserDto) {
    const createdUser = await this.userRepository.save({
      login,
      password: await this.authenticationService.hashPassword(password),
    });

    return new UserTransformer(createdUser);
  }

  async findAll() {
    return (await this.userRepository.find()).map(
      (user) => new UserTransformer(user),
    );
  }

  async findOne(id: string) {
    const foundUser = await this.userRepository.findOne({ where: { id } });

    if (foundUser === null) {
      throw new NotFoundErrorException();
    }

    return new UserTransformer(foundUser);
  }

  async update(id: string, { oldPassword, newPassword }: UpdateUserDto) {
    const foundUser = await this.userRepository.findOne({ where: { id } });

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

    const updateResult = await this.userRepository.update(id, {
      password: await this.authenticationService.hashPassword(newPassword),
      updatedAt: new Date(),
      version: +foundUser.version + 1,
    });

    if (updateResult.affected !== 1) {
      throw new Error('Internal server error');
    }

    return this.findOne(id);
  }

  async remove(id: string) {
    const foundUser = await this.userRepository.findOne({ where: { id } });

    if (foundUser === null) {
      throw new NotFoundErrorException();
    }

    return this.userRepository.remove(foundUser);
  }
}
