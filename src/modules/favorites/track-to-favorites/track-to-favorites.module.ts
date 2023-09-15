import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TrackToFavoritesController } from './track-to-favorites.controller';
import { TrackToFavorite } from './entities/track-to-favorite.entity';
import { TrackToFavoritesService } from './track-to-favorites.service';
import { Track } from '../../tracks/entities/track.entity';

@Module({
  controllers: [TrackToFavoritesController],
  providers: [TrackToFavoritesService],
  imports: [TypeOrmModule.forFeature([TrackToFavorite, Track])],
})
export class TrackToFavoritesModule {}
