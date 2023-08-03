import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import configuration from './config/configuration';

import { UsersModule } from './modules/users/users.module';
import { AuthenticationModule } from './modules/authentication/authentication.module';
import { ArtistsModule } from './modules/artists/artists.module';
import { AlbumsModule } from './modules/albums/albums.module';
import { TracksModule } from './modules/tracks/tracks.module';
import { FavoritesModule } from './modules/favorites/favorites.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    UsersModule,
    ArtistsModule,
    TracksModule,
    AlbumsModule,
    FavoritesModule,
    AuthenticationModule,
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          type: 'postgres',
          host: configService.get<string>('PG_HOST'),
          port: configService.get<number>('PG_PORT'),
          username: configService.get<string>('PG_USER'),
          password: configService.get<string>('PG_PASSWORD'),
          database: configService.get<string>('PG_DB'),
          logging: configService.get<boolean>('PG_LOGGING'),
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
          synchronize: false,
        };
      },
    }),
  ],
})
export class AppModule {}
