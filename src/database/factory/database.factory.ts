import { BaseRepository } from '../../common/database/base-repository';
import { User } from '../../users/entities/user.entity';
import { Artist } from '../../artists/entities/artist.entity';
import { Track } from '../../tracks/entities/track.entity';
import { Album } from '../../albums/entities/album.entity';

let dbInstance = null;

export const createInstance = () => {
  if (dbInstance === null) {
    dbInstance = {
      users: new BaseRepository<User>(),
      artists: new BaseRepository<Artist>(),
      tracks: new BaseRepository<Track>(),
      albums: new BaseRepository<Album>(),
      favorites: {
        artists: new Map<string, Artist>(),
        albums: new Map<string, Album>(),
        tracks: new Map<string, Track>(),
      },
    };
  }

  return dbInstance;
};

export const databaseFactory = {
  createInstance,
};

export type DatabaseInstance = ReturnType<typeof createInstance>;
