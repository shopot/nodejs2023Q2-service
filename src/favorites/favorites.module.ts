import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { DatabaseService } from '../database/database.service';

@Module({
  controllers: [FavoritesController],
  providers: [FavoritesService, DatabaseService],
})
export class FavoritesModule {}
