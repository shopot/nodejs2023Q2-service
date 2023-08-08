import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { DatabaseService } from '../database/database.service';
import { Track } from './entities/track.entity';
import { NotFoundErrorException } from '../common/exceptions';
import { FavoritesService } from '../favorites/favorites.service';

@Injectable()
export class TracksService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly favoritesService: FavoritesService,
  ) {}

  create(createTrackDto: CreateTrackDto) {
    const { name, duration, artistId, albumId } = createTrackDto;

    const trackArtistId = this.databaseService.artists.has(artistId)
      ? artistId
      : null;

    const trackAlbumId = this.databaseService.albums.has(albumId)
      ? albumId
      : null;

    const track = new Track({
      id: uuidv4(),
      name,
      artistId: trackArtistId,
      albumId: trackAlbumId,
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
    try {
      this.favoritesService.removeTrack(id);
    } catch {
      // nobody
    }

    return this.databaseService.tracks.remove({ id });
  }
}
