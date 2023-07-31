import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import {
  NotFoundErrorException,
  UnprocessableErrorException,
} from '../common/exceptions';

@Injectable()
export class FavoritesService {
  constructor(private readonly databaseService: DatabaseService) {}

  findAll() {
    const artists = this.databaseService.favorites.artists.map((id) =>
      this.databaseService.artists.findOneBy({ id }),
    );

    const albums = this.databaseService.favorites.albums.map((id) =>
      this.databaseService.albums.findOneBy({ id }),
    );

    const tracks = this.databaseService.favorites.tracks.map((id) =>
      this.databaseService.tracks.findOneBy({ id }),
    );

    return {
      artists,
      albums,
      tracks,
    };
  }

  createTrack(trackId: string) {
    if (!this.databaseService.tracks.has(trackId)) {
      throw new UnprocessableErrorException();
    }

    const foundTrackIndex = this.databaseService.favorites.tracks.findIndex(
      (id) => id === trackId,
    );

    if (foundTrackIndex === -1) {
      this.databaseService.favorites.tracks.push(trackId);

      return trackId;
    }

    return null;
  }

  removeTrack(trackId: string) {
    const foundTrackIndex = this.databaseService.favorites.tracks.findIndex(
      (id) => id === trackId,
    );

    if (foundTrackIndex === -1) {
      throw new NotFoundErrorException();
    }

    this.databaseService.favorites.tracks.splice(foundTrackIndex, 1);

    return trackId;
  }

  createAlbum(albumId: string) {
    if (!this.databaseService.albums.has(albumId)) {
      throw new UnprocessableErrorException();
    }

    const foundAlbumIndex = this.databaseService.favorites.albums.findIndex(
      (id) => id === albumId,
    );

    if (foundAlbumIndex === -1) {
      this.databaseService.favorites.albums.push(albumId);

      return albumId;
    }

    return null;
  }

  removeAlbum(albumId: string) {
    const foundAlbumIndex = this.databaseService.favorites.albums.findIndex(
      (id) => id === albumId,
    );

    if (foundAlbumIndex === -1) {
      throw new NotFoundErrorException();
    }

    this.databaseService.favorites.albums.splice(foundAlbumIndex, 1);

    return albumId;
  }

  createArtist(artistId: string) {
    if (!this.databaseService.artists.has(artistId)) {
      throw new UnprocessableErrorException();
    }

    const foundArtistIndex = this.databaseService.favorites.artists.findIndex(
      (id) => id === artistId,
    );

    if (foundArtistIndex === -1) {
      this.databaseService.favorites.artists.push(artistId);

      return artistId;
    }

    return null;
  }

  removeArtist(artistId: string) {
    const foundArtistIndex = this.databaseService.favorites.artists.findIndex(
      (id) => id === artistId,
    );

    if (foundArtistIndex === -1) {
      throw new NotFoundErrorException();
    }

    this.databaseService.favorites.artists.splice(foundArtistIndex, 1);

    return artistId;
  }
}
