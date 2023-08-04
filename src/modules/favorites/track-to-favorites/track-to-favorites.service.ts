import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import {
  AppNotFoundError,
  AppUnprocessableError,
} from '../../../common/exceptions';
import { Track } from '../../tracks/entities/track.entity';
import { TrackToFavorite } from './entities/track-to-favorite.entity';

@Injectable()
export class TrackToFavoritesService {
  constructor(
    @InjectRepository(TrackToFavorite)
    private readonly track2FavoriteRepository: Repository<TrackToFavorite>,
    @InjectRepository(Track)
    private readonly trackRepository: Repository<Track>,
  ) {}

  async createTrack(trackId: string) {
    const foundTrack = await this.trackRepository.findOne({
      where: { id: trackId },
    });

    if (foundTrack === null) {
      throw new AppUnprocessableError();
    }

    await this.track2FavoriteRepository.save({ trackId });

    return foundTrack;
  }

  async removeTrack(trackId: string) {
    const foundTrack = await this.track2FavoriteRepository.findOne({
      where: { trackId },
    });

    if (foundTrack === null) {
      throw new AppNotFoundError();
    }

    return await this.track2FavoriteRepository.delete({ trackId });
  }
}
