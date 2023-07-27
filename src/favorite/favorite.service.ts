import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { NotFoundErrorException } from '../common/exceptions';

@Injectable()
export class FavoriteService {
  constructor(private readonly databaseService: DatabaseService) {}

  findAll() {
    return {
      artists: Array.from(this.databaseService.favorites.artists.values()),
      albums: Array.from(this.databaseService.favorites.albums.values()),
      tracks: Array.from(this.databaseService.favorites.tracks.values()),
    };
  }

  createTrack(id: string) {
    this.databaseService.favorites.tracks.add(id);
  }

  removeTrack(id: string) {
    if (!this.databaseService.favorites.tracks.has(id)) {
      throw new NotFoundErrorException();
    }

    this.databaseService.favorites.tracks.delete(id);

    return id;
  }

  createAlbum(id: string) {
    this.databaseService.favorites.albums.add(id);
  }

  removeAlbum(id: string) {
    if (!this.databaseService.favorites.albums.has(id)) {
      throw new NotFoundErrorException();
    }

    this.databaseService.favorites.albums.delete(id);

    return id;
  }

  createArtist(id: string) {
    this.databaseService.favorites.artists.add(id);
  }

  removeArtist(id: string) {
    if (!this.databaseService.favorites.artists.has(id)) {
      throw new NotFoundErrorException();
    }

    this.databaseService.favorites.artists.delete(id);

    return id;
  }
}
