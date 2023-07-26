import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { BaseRepository } from '../common/database/base-repository';
import { Artist } from './entities/artist.entity';
import { NotFoundException } from '../common/exceptions';

@Injectable()
export class ArtistService {
  private artistDb: BaseRepository<Artist>;

  constructor() {
    this.artistDb = new BaseRepository<Artist>();
  }

  create(createArtistDto: CreateArtistDto): Artist {
    const artist = new Artist({
      id: uuidv4(),
      ...createArtistDto,
    });

    return this.artistDb.create(artist);
  }

  findAll(): Artist[] {
    return this.artistDb.find();
  }

  findOne(id: string): Artist {
    const foundArtist = this.artistDb.findOneBy({ id });

    if (foundArtist === null) {
      throw new NotFoundException();
    }

    return foundArtist;
  }

  update(id: string, { name, grammy }: UpdateArtistDto) {
    const foundArtist = this.artistDb.findOneBy({ id });

    if (foundArtist === null) {
      throw new NotFoundException();
    }

    const updatedArtist = new Artist({ ...foundArtist, name, grammy });

    return this.artistDb.update(id, updatedArtist);
  }

  remove(id: string) {
    if (!this.artistDb.has(id)) {
      throw new NotFoundException();
    }

    return this.artistDb.remove({ id });
  }
}
