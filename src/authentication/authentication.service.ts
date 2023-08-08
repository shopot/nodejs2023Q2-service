import { Injectable } from '@nestjs/common';
import { compare, hash } from 'bcrypt';
import { SALT_OR_ROUNDS } from '../common/constants';

@Injectable()
export class AuthenticationService {
  async hashPassword(plainTextPassword: string) {
    return await hash(plainTextPassword, SALT_OR_ROUNDS);
  }

  async verifyPassword(plainTextPassword: string, hashedPassword: string) {
    return await compare(plainTextPassword, hashedPassword);
  }
}
