import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { DatabaseService } from '../database/database.service';
import { Track } from './entities/track.entity';
import { NotFoundErrorException } from '../common/exceptions';

@Injectable()
export class TrackService {
  constructor(private readonly databaseService: DatabaseService) {}

  create(createTrackDto: CreateTrackDto) {
    const { name, duration, artistId, albumId } = createTrackDto;

    const track = new Track({
      id: uuidv4(),
      name,
      artistId: artistId || null,
      albumId: albumId || null,
      duration,
    });

    return this.databaseService.tracks.create(track);
  }

  findAll() {
    return this.databaseService.tracks.find();
  }

  findOne(id: string) {
    const foundTrack = this.databaseService.tracks.findOneBy({ id });

    if (foundTrack === null) {
      throw new NotFoundErrorException();
    }

    return foundTrack;
  }

  update(id: string, updateTrackDto: UpdateTrackDto) {
    const foundTrack = this.databaseService.tracks.findOneBy({ id });

    if (foundTrack === null) {
      throw new NotFoundErrorException();
    }

    const updatedTrack = new Track({
      ...foundTrack,
      ...updateTrackDto,
    });

    return this.databaseService.tracks.update(id, updatedTrack);
  }

  remove(id: string) {
    if (!this.databaseService.tracks.has(id)) {
      throw new NotFoundErrorException();
    }

    // Remove from favorites
    this.databaseService.favorites.tracks.delete(id);

    return this.databaseService.tracks.remove({ id });
  }
}
