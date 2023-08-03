import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Album } from '../albums/entities/album.entity';
import { Track } from '../tracks/entities/track.entity';
import { Artist } from '../artists/entities/artist.entity';

import { FavoritesController } from './favorites.controller';
import { FavoritesService } from './favorites.service';
import { AlbumToFavoritesModule } from './album-to-favorites/album-to-favorites.module';
import { TrackToFavoritesModule } from './track-to-favorites/track-to-favorites.module';
import { ArtistToFavoritesModule } from './artist-to-favorites/artist-to-favorites.module';

@Global()
@Module({
  controllers: [FavoritesController],
  providers: [FavoritesService],
  imports: [
    TypeOrmModule.forFeature([Album, Track, Artist]),
    AlbumToFavoritesModule,
    TrackToFavoritesModule,
    ArtistToFavoritesModule,
  ],
  exports: [TypeOrmModule],
})
export class FavoritesModule {}
