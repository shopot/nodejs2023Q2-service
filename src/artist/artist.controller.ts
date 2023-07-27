import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  HttpCode,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import { StatusCodes } from 'http-status-codes';

import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { UuidDto } from '../common/dto';
import {
  HttpNotFoundException,
  HttpServerErrorException,
  NotFoundErrorException,
} from '../common/exceptions';
import { HttpExceptionFilter } from '../common/filters';
import { TransformInterceptor } from '../common/interceptors';

@Controller('artist')
@UseFilters(new HttpExceptionFilter())
@UseInterceptors(new TransformInterceptor())
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Post()
  create(@Body() createArtistDto: CreateArtistDto) {
    return this.artistService.create(createArtistDto);
  }

  @Get()
  findAll() {
    return this.artistService.findAll();
  }

  @Get(':id')
  findOne(@Param() { id }: UuidDto) {
    try {
      return this.artistService.findOne(id);
    } catch (err) {
      if (err instanceof NotFoundErrorException) {
        throw new HttpNotFoundException();
      }

      throw new HttpServerErrorException();
    }
  }

  @Put(':id')
  update(@Param() { id }: UuidDto, @Body() updateArtistDto: UpdateArtistDto) {
    try {
      return this.artistService.update(id, updateArtistDto);
    } catch (err) {
      if (err instanceof NotFoundErrorException) {
        throw new HttpNotFoundException();
      }

      throw new HttpServerErrorException();
    }
  }

  @Delete(':id')
  @HttpCode(StatusCodes.NO_CONTENT)
  remove(@Param() { id }: UuidDto) {
    try {
      return this.artistService.remove(id);
    } catch (err) {
      if (err instanceof NotFoundErrorException) {
        throw new HttpNotFoundException();
      }

      throw new HttpServerErrorException();
    }
  }
}
