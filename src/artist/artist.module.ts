import { Module } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { DatabaseService } from '../database/database.service';

@Module({
  controllers: [ArtistController],
  providers: [ArtistService, DatabaseService],
})
export class ArtistModule {}
