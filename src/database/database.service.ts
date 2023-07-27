import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../common/database/base-repository';
import { User } from '../user/entities/user.entity';
import { Album } from '../album/entities/album.entity';
import { Artist } from '../artist/entities/artist.entity';
import { Track } from '../track/entities/track.entity';

@Injectable()
export class DatabaseService {
  private database: {
    users: BaseRepository<User>;
    artists: BaseRepository<Artist>;
    tracks: BaseRepository<Track>;
    albums: BaseRepository<Album>;
    favorites: {
      artists: Set<string>;
      albums: Set<string>;
      tracks: Set<string>;
    };
  };
  constructor() {
    this.database = {
      users: new BaseRepository<User>(),
      artists: new BaseRepository<Artist>(),
      tracks: new BaseRepository<Track>(),
      albums: new BaseRepository<Album>(),
      favorites: {
        artists: new Set(),
        albums: new Set(),
        tracks: new Set(),
      },
    };
  }

  get users() {
    return this.database.users;
  }

  get artists() {
    return this.database.artists;
  }

  get tracks() {
    return this.database.tracks;
  }

  get albums() {
    return this.database.albums;
  }

  get favorites() {
    return this.database.favorites;
  }
}
