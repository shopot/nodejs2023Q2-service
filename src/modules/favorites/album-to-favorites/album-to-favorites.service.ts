import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import {
  NotFoundErrorException,
  UnprocessableErrorException,
} from '../../../common/exceptions';
import { InjectRepository } from '@nestjs/typeorm';

import { AlbumToFavorite } from './entities/album-to-favorite.entity';
import { Album } from '../../albums/entities/album.entity';

@Injectable()
export class AlbumToFavoritesService {
  constructor(
    @InjectRepository(AlbumToFavorite)
    private readonly album2fRepository: Repository<AlbumToFavorite>,
    @InjectRepository(Album)
    private readonly albumRepository: Repository<Album>,
  ) {}

  async createAlbum(albumId: string) {
    const foundAlbum = await this.albumRepository.findOne({
      where: { id: albumId },
    });

    if (foundAlbum === null) {
      throw new UnprocessableErrorException();
    }

    await this.album2fRepository.save({ albumId });

    return foundAlbum;
  }

  async removeAlbum(albumId: string) {
    const foundAlbum = await this.album2fRepository.findOne({
      where: { albumId },
    });

    if (foundAlbum === null) {
      throw new NotFoundErrorException();
    }

    return await this.album2fRepository.delete({ albumId });
  }
}
