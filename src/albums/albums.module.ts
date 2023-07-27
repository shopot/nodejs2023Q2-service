import { Module } from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { AlbumsController } from './albums.controller';
import { DatabaseService } from '../database/database.service';

@Module({
  controllers: [AlbumsController],
  providers: [AlbumsService, DatabaseService],
})
export class AlbumsModule {}
