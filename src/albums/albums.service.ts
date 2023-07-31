import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { DatabaseService } from '../database/database.service';
import { Album } from './entities/album.entity';
import { NotFoundErrorException } from '../common/exceptions';
import { FavoritesService } from '../favorites/favorites.service';

@Injectable()
export class AlbumsService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly favoritesService: FavoritesService,
  ) {}

  create(createAlbumDto: CreateAlbumDto) {
    const { name, year, artistId } = createAlbumDto;

    const album = new Album({
      id: uuidv4(),
      name,
      year,
      artistId: artistId || null,
    });

    return this.databaseService.albums.create(album);
  }

  findAll() {
    return this.databaseService.albums.find();
  }

  findOne(id: string) {
    const foundAlbum = this.databaseService.albums.findOneBy({ id });

    if (foundAlbum === null) {
      throw new NotFoundErrorException();
    }

    return foundAlbum;
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const foundAlbum = this.databaseService.albums.findOneBy({ id });

    if (foundAlbum === null) {
      throw new NotFoundErrorException();
    }

    const updatedTrack = new Album({
      ...foundAlbum,
      ...updateAlbumDto,
    });

    return this.databaseService.albums.update(id, updatedTrack);
  }

  remove(id: string) {
    if (!this.databaseService.albums.has(id)) {
      throw new NotFoundErrorException();
    }

    // Remove from favorites
    try {
      this.favoritesService.removeAlbum(id);
    } catch {
      // nobody
    }

    // Remove from tracks
    const tracks = this.databaseService.tracks.find();

    tracks.forEach((track) => {
      if (track.albumId === id) {
        const updatedTrack = {
          ...track,
          albumId: null,
        };

        this.databaseService.tracks.update(track.id, updatedTrack);
      }
    });

    return this.databaseService.albums.remove({ id });
  }
}
