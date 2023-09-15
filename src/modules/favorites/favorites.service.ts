import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Track } from '../tracks/entities/track.entity';
import { Album } from '../albums/entities/album.entity';
import { Artist } from '../artists/entities/artist.entity';
import { AlbumToFavorite } from './album-to-favorites/entities/album-to-favorite.entity';
import { ArtistToFavorite } from './artist-to-favorites/entities/artist-to-favorite.entity';
import { TrackToFavorite } from './track-to-favorites/entities/track-to-favorite.entity';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(Track)
    private readonly trackRepository: Repository<Track>,
    @InjectRepository(Album)
    private readonly albumRepository: Repository<Album>,
    @InjectRepository(Artist)
    private readonly artistRepository: Repository<Artist>,
  ) {}

  async findAll() {
    const albums = await this.albumRepository
      .createQueryBuilder('album')
      .innerJoinAndSelect(AlbumToFavorite, 'a2f', 'a2f.albumId = album.id')
      .getMany();

    const artists = await this.artistRepository
      .createQueryBuilder('artist')
      .innerJoinAndSelect(ArtistToFavorite, 'a2f', 'a2f.artistId = artist.id')
      .getMany();

    const tracks = await this.trackRepository
      .createQueryBuilder('track')
      .innerJoinAndSelect(TrackToFavorite, 't2f', 't2f.trackId = track.id')
      .getMany();

    return {
      albums,
      artists,
      tracks,
    };
  }
}
