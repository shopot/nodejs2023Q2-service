import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';

import { InitialSchema1690950864750 } from '../database/migrations/1690950864750-initial-schema';
import { AddFavorites1691066268876 } from '../database/migrations/1691066268876-add-favorites';

import { User } from '../modules/users/entities/user.entity';
import { Album } from '../modules/albums/entities/album.entity';
import { Artist } from '../modules/artists/entities/artist.entity';
import { Track } from '../modules/tracks/entities/track.entity';
import { AlbumToFavorite } from '../modules/favorites/entities/album-to-favorite.entity';
import { TrackToFavorite } from '../modules/favorites/entities/track-to-favorite.entity';
import { ArtistToFavorite } from '../modules/favorites/entities/artist-to-favorite.entity';

config();

const configService = new ConfigService();

export default new DataSource({
  type: 'postgres',
  host: configService.get<string>('PG_HOST'),
  port: configService.get<number>('PG_PORT'),
  username: configService.get<string>('PG_USER'),
  password: configService.get<string>('PG_PASSWORD'),
  database: configService.get<string>('PG_DB'),
  logging: configService.get<boolean>('PG_LOGGING'),
  entities: [
    User,
    Album,
    Artist,
    Track,
    AlbumToFavorite,
    TrackToFavorite,
    ArtistToFavorite,
  ],
  migrations: [InitialSchema1690950864750, AddFavorites1691066268876],
});
