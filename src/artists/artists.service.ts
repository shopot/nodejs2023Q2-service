import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';
import { NotFoundErrorException } from '../common/exceptions';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class ArtistsService {
  constructor(private databaseService: DatabaseService) {}

  create(createArtistDto: CreateArtistDto): Artist {
    const artist = new Artist({
      id: uuidv4(),
      ...createArtistDto,
    });

    return this.databaseService.artists.create(artist);
  }

  findAll(): Artist[] {
    return this.databaseService.artists.find();
  }

  findOne(id: string): Artist {
    const foundArtist = this.databaseService.artists.findOneBy({ id });

    if (foundArtist === null) {
      throw new NotFoundErrorException();
    }

    return foundArtist;
  }

  update(id: string, { name, grammy }: UpdateArtistDto) {
    const foundArtist = this.databaseService.artists.findOneBy({ id });

    if (foundArtist === null) {
      throw new NotFoundErrorException();
    }

    const updatedArtist = new Artist({ ...foundArtist, name, grammy });

    return this.databaseService.artists.update(id, updatedArtist);
  }

  remove(id: string) {
    if (!this.databaseService.artists.has(id)) {
      throw new NotFoundErrorException();
    }

    // Remove from favorites
    this.databaseService.favorites.artists.delete(id);

    // Remove from tracks
    const tracks = this.databaseService.tracks.find();

    tracks.forEach((track) => {
      if (track.artistId === id) {
        const updatedTrack = {
          ...track,
          artistId: null,
        };

        this.databaseService.tracks.update(track.id, updatedTrack);
      }
    });

    // Remove from albums
    const albums = this.databaseService.albums.find();

    albums.forEach((album) => {
      if (album.artistId === id) {
        const updatedAlbum = {
          ...album,
          artistId: null,
        };

        this.databaseService.albums.update(album.id, updatedAlbum);
      }
    });

    return this.databaseService.artists.remove({ id });
  }
}
