import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TracksService } from './tracks.service';
import { TracksController } from './tracks.controller';
import { Track } from './entities/track.entity';

@Module({
  controllers: [TracksController],
  providers: [TracksService],
  imports: [TypeOrmModule.forFeature([Track])],
  exports: [TypeOrmModule],
})
export class TracksModule {}
