import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import {
  NotFoundErrorException,
  UnprocessableErrorException,
} from '../common/exceptions';

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
    const foundTrack = this.databaseService.tracks.findOneBy({ id });

    if (foundTrack === null) {
      throw new UnprocessableErrorException();
    }

    this.databaseService.favorites.tracks.set(id, foundTrack);
  }

  removeTrack(id: string) {
    if (!this.databaseService.tracks.has(id)) {
      throw new NotFoundErrorException();
    }

    if (!this.databaseService.favorites.tracks.has(id)) {
      throw new NotFoundErrorException();
    }

    this.databaseService.favorites.tracks.delete(id);

    return id;
  }

  createAlbum(id: string) {
    const foundAlbum = this.databaseService.albums.findOneBy({ id });

    if (foundAlbum === null) {
      throw new UnprocessableErrorException();
    }

    this.databaseService.favorites.albums.set(id, foundAlbum);
  }

  removeAlbum(id: string) {
    if (!this.databaseService.albums.has(id)) {
      throw new NotFoundErrorException();
    }

    if (!this.databaseService.favorites.albums.has(id)) {
      throw new NotFoundErrorException();
    }

    this.databaseService.favorites.albums.delete(id);

    return id;
  }

  createArtist(id: string) {
    const foundArtist = this.databaseService.artists.findOneBy({ id });

    if (foundArtist === null) {
      throw new UnprocessableErrorException();
    }

    this.databaseService.favorites.artists.set(id, foundArtist);
  }

  removeArtist(id: string) {
    if (!this.databaseService.artists.has(id)) {
      throw new NotFoundErrorException();
    }

    if (!this.databaseService.favorites.artists.has(id)) {
      throw new NotFoundErrorException();
    }

    this.databaseService.favorites.artists.delete(id);

    return id;
  }
}
