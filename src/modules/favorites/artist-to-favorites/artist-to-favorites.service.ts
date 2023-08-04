import { Injectable } from '@nestjs/common';

import {
  AppNotFoundError,
  AppUnprocessableError,
} from '../../../common/exceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ArtistToFavorite } from './entities/artist-to-favorite.entity';
import { Artist } from '../../artists/entities/artist.entity';

@Injectable()
export class ArtistToFavoritesService {
  constructor(
    @InjectRepository(ArtistToFavorite)
    private readonly artist2fRepository: Repository<ArtistToFavorite>,
    @InjectRepository(Artist)
    private readonly artistRepository: Repository<Artist>,
  ) {}

  async findOne(artistId: string) {
    return await this.artistRepository.findOne({
      where: { id: artistId },
    });
  }

  async createArtist(artistId: string) {
    const foundArtist = await this.findOne(artistId);

    if (foundArtist === null) {
      throw new AppUnprocessableError();
    }

    await this.artist2fRepository.save({ artistId });

    return foundArtist;
  }

  async removeArtist(artistId: string) {
    const foundArtist = await this.findOne(artistId);

    if (foundArtist === null) {
      throw new AppNotFoundError();
    }

    return await this.artist2fRepository.delete({ artistId });
  }
}
