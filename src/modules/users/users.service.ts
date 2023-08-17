import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { forwardRef, Inject, Injectable } from '@nestjs/common';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { AppForbiddenError, AppNotFoundError } from '../../common/exceptions';
import { AuthService } from '../auth/auth.service';
import { UserTransformer } from './transformers/user.transformer';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}

  async create({ login, password }: CreateUserDto) {
    const createdUser = await this.userRepository.save({
      login,
      password: await this.authService.hashPassword(password),
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
      throw new AppNotFoundError();
    }

    return new UserTransformer(foundUser);
  }

  async findByLogin(login: string) {
    return await this.userRepository.findOne({ where: { login } });
  }

  async update(id: string, { oldPassword, newPassword }: UpdateUserDto) {
    const foundUser = await this.userRepository.findOne({ where: { id } });

    if (foundUser === null) {
      throw new AppNotFoundError();
    }

    const { password: hashedPassword } = foundUser;

    const isPasswordMatching = await this.authService.verifyPassword(
      oldPassword,
      hashedPassword,
    );

    if (!isPasswordMatching) {
      throw new AppForbiddenError();
    }

    const updateResult = await this.userRepository.update(id, {
      password: await this.authService.hashPassword(newPassword),
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
      throw new AppNotFoundError();
    }

    return this.userRepository.remove(foundUser);
  }
}
