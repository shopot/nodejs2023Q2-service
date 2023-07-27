import { Module } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { DatabaseService } from '../database/database.service';

@Module({
  controllers: [AlbumController],
  providers: [AlbumService, DatabaseService],
})
export class AlbumModule {}
