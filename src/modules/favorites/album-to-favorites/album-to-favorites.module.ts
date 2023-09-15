import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AlbumToFavoritesController } from './album-to-favorites.controller';
import { AlbumToFavoritesService } from './album-to-favorites.service';
import { AlbumToFavorite } from './entities/album-to-favorite.entity';
import { Album } from '../../albums/entities/album.entity';

@Module({
  controllers: [AlbumToFavoritesController],
  providers: [AlbumToFavoritesService],
  imports: [TypeOrmModule.forFeature([AlbumToFavorite, Album])],
})
export class AlbumToFavoritesModule {}
