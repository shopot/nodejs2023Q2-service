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
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

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
import { Track } from './entities/track.entity';

@Controller('track')
@ApiTags('track')
@UseFilters(new HttpExceptionFilter())
@UseInterceptors(new TransformInterceptor())
export class TracksController {
  constructor(private readonly trackService: TracksService) {}

  @Post()
  @ApiBody({
    type: CreateTrackDto,
    description: 'A name, artistId, albumId and duration for the new track',
  })
  @ApiCreatedResponse({
    description: 'The track has been successfully created.',
    type: Track,
  })
  @ApiBadRequestResponse({
    description: 'Request body does not contain required fields',
  })
  create(@Body() createTrackDto: CreateTrackDto) {
    return this.trackService.create(createTrackDto);
  }

  @Get()
  @ApiOkResponse({
    description: 'A tracks has been successfully fetched',
    type: [Track],
  })
  findAll() {
    return this.trackService.findAll();
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Should be an id of a track that exists in the database',
    type: 'string',
  })
  @ApiOkResponse({
    description: 'A track has been successfully fetched',
    type: Track,
  })
  @ApiBadRequestResponse({
    description: 'A track with given id is invalid (not uuid).',
  })
  @ApiNotFoundResponse({
    description: 'A track with given id does not exist.',
  })
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
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Should be an id of a track that exists in the database',
    type: 'string',
  })
  @ApiBody({
    type: UpdateTrackDto,
    description: 'A new name, artistId, albumId and duration for the track',
  })
  @ApiOkResponse({
    description: 'A track has been successfully updated',
    type: Track,
  })
  @ApiBadRequestResponse({
    description: 'A track with given id is invalid (not uuid).',
  })
  @ApiNotFoundResponse({
    description: 'A track with given id does not exist.',
  })
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
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Should be an id of a track that exists in the database',
    type: 'string',
  })
  @ApiNoContentResponse({
    description: 'A track has been successfully deleted',
  })
  @ApiBadRequestResponse({
    description: 'A track with given id is invalid (not uuid).',
  })
  @ApiNotFoundResponse({
    description: 'A track with given id does not exist.',
  })
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
