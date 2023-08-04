import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';
import { AppNotFoundError } from '../../common/exceptions';

@Injectable()
export class ArtistsService {
  constructor(
    @InjectRepository(Artist)
    private readonly artistRepository: Repository<Artist>,
  ) {}

  async create(createArtistDto: CreateArtistDto) {
    return await this.artistRepository.save({ ...createArtistDto });
  }

  async findAll() {
    return await this.artistRepository.find();
  }

  async findOne(id: string) {
    const foundArtist = await this.artistRepository.findOne({ where: { id } });

    if (foundArtist === null) {
      throw new AppNotFoundError();
    }
    return foundArtist;
  }

  async update(id: string, updateArtistDto: UpdateArtistDto) {
    const foundArtist = await this.findOne(id);

    const updatedArtist = {
      ...foundArtist,
      ...updateArtistDto,
    };

    const updateResult = await this.artistRepository.update(id, updatedArtist);

    if (updateResult.affected !== 1) {
      throw new Error('Internal server error');
    }

    return updatedArtist;
  }

  async remove(id: string) {
    const foundArtist = await this.findOne(id);

    return this.artistRepository.remove(foundArtist);
  }
}
