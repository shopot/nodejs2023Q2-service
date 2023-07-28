import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { DatabaseService } from '../database/database.service';
import { AuthenticationService } from '../authentication/authentication.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, DatabaseService, AuthenticationService],
})
export class UsersModule {}
