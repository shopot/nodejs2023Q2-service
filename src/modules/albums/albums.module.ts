import { Module } from '@nestjs/common';

import { AlbumsService } from './albums.service';
import { AlbumsController } from './albums.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Album } from './entities/album.entity';

@Module({
  controllers: [AlbumsController],
  providers: [AlbumsService],
  imports: [TypeOrmModule.forFeature([Album])],
  exports: [TypeOrmModule],
})
export class AlbumsModule {}
