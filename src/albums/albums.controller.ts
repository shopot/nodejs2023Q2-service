import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  Put,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AlbumsService } from './albums.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { UuidDto } from '../common/dto';
import { HttpExceptionFilter } from '../common/filters';
import { TransformInterceptor } from '../common/interceptors';
import {
  HttpNotFoundException,
  HttpServerErrorException,
  NotFoundErrorException,
} from '../common/exceptions';

@Controller('album')
@ApiTags('album')
@UseFilters(new HttpExceptionFilter())
@UseInterceptors(new TransformInterceptor())
export class AlbumsController {
  constructor(private readonly albumService: AlbumsService) {}

  @Post()
  create(@Body() createAlbumDto: CreateAlbumDto) {
    return this.albumService.create(createAlbumDto);
  }

  @Get()
  findAll() {
    return this.albumService.findAll();
  }

  @Get(':id')
  findOne(@Param() { id }: UuidDto) {
    try {
      return this.albumService.findOne(id);
    } catch (err) {
      if (err instanceof NotFoundErrorException) {
        throw new HttpNotFoundException();
      }

      throw new HttpServerErrorException();
    }
  }

  @Put(':id')
  update(@Param() { id }: UuidDto, @Body() updateAlbumDto: UpdateAlbumDto) {
    try {
      return this.albumService.update(id, updateAlbumDto);
    } catch (err) {
      if (err instanceof NotFoundErrorException) {
        throw new HttpNotFoundException();
      }

      throw new HttpServerErrorException();
    }
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param() { id }: UuidDto) {
    try {
      return this.albumService.remove(id);
    } catch (err) {
      if (err instanceof NotFoundErrorException) {
        throw new HttpNotFoundException();
      }

      throw new HttpServerErrorException();
    }
  }
}
