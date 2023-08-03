import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';
import { NotFoundErrorException } from '../../common/exceptions';

@Injectable()
export class TracksService {
  constructor(
    @InjectRepository(Track)
    private readonly trackRepository: Repository<Track>,
  ) {}

  async create(createTrackDto: CreateTrackDto) {
    return await this.trackRepository.save({ ...createTrackDto });
  }

  async findAll() {
    return await this.trackRepository.find();
  }

  async findOne(id: string) {
    const foundTrack = await this.trackRepository.findOne({ where: { id } });

    if (foundTrack === null) {
      throw new NotFoundErrorException();
    }

    return foundTrack;
  }

  async update(id: string, updateTrackDto: UpdateTrackDto) {
    const foundTrack = await this.findOne(id);

    if (foundTrack === null) {
      throw new NotFoundErrorException();
    }

    const updatedTrack = {
      ...foundTrack,
      ...updateTrackDto,
    };

    const updateResult = await this.trackRepository.update(id, updatedTrack);

    if (updateResult.affected !== 1) {
      throw new Error('Internal server error');
    }

    return updatedTrack;
  }

  async remove(id: string) {
    const foundTrack = await this.findOne(id);

    return this.trackRepository.remove(foundTrack);
  }
}
