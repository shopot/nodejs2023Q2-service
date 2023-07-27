import { BaseRepository } from '../common/database/base-repository';
import { User } from '../user/entities/user.entity';
import { Artist } from '../artist/entities/artist.entity';
import { Track } from '../track/entities/track.entity';
import { Album } from '../album/entities/album.entity';

export const databaseInstance = {
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

export type DatabaseInstance = typeof databaseInstance;
