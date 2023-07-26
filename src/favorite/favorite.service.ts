import { Injectable } from '@nestjs/common';
import { Favorite } from './entities/favorite.entity';

@Injectable()
export class FavoriteService {
  private favoriteDb: Favorite;

  constructor() {
    this.favoriteDb = new Favorite();
  }

  findAll() {
    return `This action returns all favorite`;
  }

  createTrack(id: string) {}

  removeTrack(id: string) {}

  createAlbum(id: string) {}

  removeAlbum(id: string) {}

  createArtist(id: string) {}

  removeArtist(id: string) {}
}
