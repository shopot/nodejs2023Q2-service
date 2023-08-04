import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';
import { AppNotFoundError } from '../../common/exceptions';

@Injectable()
export class AlbumsService {
  constructor(
    @InjectRepository(Album)
    private readonly albumRepository: Repository<Album>,
  ) {}

  async create(createAlbumDto: CreateAlbumDto) {
    return await this.albumRepository.save({ ...createAlbumDto });
  }

  async findAll() {
    return await this.albumRepository.find();
  }

  async findOne(id: string) {
    const foundAlbum = await this.albumRepository.findOne({ where: { id } });

    if (foundAlbum === null) {
      throw new AppNotFoundError();
    }

    return foundAlbum;
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const foundAlbum = await this.findOne(id);

    const updatedAlbum = {
      ...foundAlbum,
      ...updateAlbumDto,
    };

    const updateResult = await this.albumRepository.update(id, updatedAlbum);

    if (updateResult.affected !== 1) {
      throw new Error('Internal server error');
    }

    return updatedAlbum;
  }

  async remove(id: string) {
    const foundAlbum = await this.findOne(id);

    await this.albumRepository.remove(foundAlbum);
  }
}
