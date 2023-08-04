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
  NotFoundException,
  InternalServerErrorException,
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
import { UuidDto } from '../../common/dto';
import { HttpExceptionFilter } from '../../common/filters';
import { TransformInterceptor } from '../../common/interceptors';
import { AppNotFoundError } from '../../common/exceptions';
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
  async create(@Body() createTrackDto: CreateTrackDto) {
    return await this.trackService.create(createTrackDto);
  }

  @Get()
  @ApiOkResponse({
    description: 'A tracks has been successfully fetched',
    type: [Track],
  })
  async findAll() {
    return await this.trackService.findAll();
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
  async findOne(@Param() { id }: UuidDto) {
    try {
      return await this.trackService.findOne(id);
    } catch (err) {
      if (err instanceof AppNotFoundError) {
        throw new NotFoundException();
      }

      throw new InternalServerErrorException();
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
  async update(
    @Param() { id }: UuidDto,
    @Body() updateTrackDto: UpdateTrackDto,
  ) {
    try {
      return await this.trackService.update(id, updateTrackDto);
    } catch (err) {
      if (err instanceof AppNotFoundError) {
        throw new NotFoundException();
      }

      throw new InternalServerErrorException();
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
  async remove(@Param() { id }: UuidDto) {
    try {
      return await this.trackService.remove(id);
    } catch (err) {
      if (err instanceof AppNotFoundError) {
        throw new NotFoundException();
      }

      throw new InternalServerErrorException();
    }
  }
}
