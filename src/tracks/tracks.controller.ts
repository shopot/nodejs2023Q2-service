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
import { StatusCodes } from 'http-status-codes';
import { ApiTags } from '@nestjs/swagger';

import { TracksService } from './tracks.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { UuidDto } from '../common/dto';
import { HttpExceptionFilter } from '../common/filters';
import { TransformInterceptor } from '../common/interceptors';
import {
  HttpNotFoundException,
  HttpServerErrorException,
  NotFoundErrorException,
} from '../common/exceptions';

@Controller('track')
@ApiTags('track')
@UseFilters(new HttpExceptionFilter())
@UseInterceptors(new TransformInterceptor())
export class TracksController {
  constructor(private readonly trackService: TracksService) {}

  @Post()
  create(@Body() createTrackDto: CreateTrackDto) {
    return this.trackService.create(createTrackDto);
  }

  @Get()
  findAll() {
    return this.trackService.findAll();
  }

  @Get(':id')
  findOne(@Param() { id }: UuidDto) {
    try {
      return this.trackService.findOne(id);
    } catch (err) {
      if (err instanceof NotFoundErrorException) {
        throw new HttpNotFoundException();
      }

      throw new HttpServerErrorException();
    }
  }

  @Put(':id')
  update(@Param() { id }: UuidDto, @Body() updateTrackDto: UpdateTrackDto) {
    try {
      return this.trackService.update(id, updateTrackDto);
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
      return this.trackService.remove(id);
    } catch (err) {
      if (err instanceof NotFoundErrorException) {
        throw new HttpNotFoundException();
      }

      throw new HttpServerErrorException();
    }
  }
}
