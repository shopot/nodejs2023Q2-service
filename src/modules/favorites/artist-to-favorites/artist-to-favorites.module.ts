import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ArtistToFavoritesService } from './artist-to-favorites.service';
import { ArtistToFavoritesController } from './artist-to-favorites.controller';
import { ArtistToFavorite } from './entities/artist-to-favorite.entity';
import { Artist } from '../../artists/entities/artist.entity';

@Module({
  controllers: [ArtistToFavoritesController],
  providers: [ArtistToFavoritesService],
  imports: [TypeOrmModule.forFeature([ArtistToFavorite, Artist])],
})
export class ArtistToFavoritesModule {}
