import { Module } from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { FavoriteController } from './favorite.controller';
import { DatabaseService } from '../database/database.service';

@Module({
  controllers: [FavoriteController],
  providers: [FavoriteService, DatabaseService],
})
export class FavoriteModule {}
