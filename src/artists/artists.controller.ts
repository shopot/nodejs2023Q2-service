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

import { ArtistsService } from './artists.service';
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
import { Artist } from './entities/artist.entity';

@Controller('artist')
@ApiTags('artist')
@UseFilters(new HttpExceptionFilter())
@UseInterceptors(new TransformInterceptor())
export class ArtistsController {
  constructor(private readonly artistService: ArtistsService) {}

  @Post()
  @ApiBody({
    type: CreateArtistDto,
    description: 'A name and grammy for the new artist',
  })
  @ApiCreatedResponse({
    description: 'The artist has been successfully created.',
    type: Artist,
  })
  @ApiBadRequestResponse({
    description: 'Request body does not contain required fields',
  })
  create(@Body() createArtistDto: CreateArtistDto) {
    return this.artistService.create(createArtistDto);
  }

  @Get()
  @ApiOkResponse({
    description: 'A artists has been successfully fetched',
    type: [Artist],
  })
  findAll() {
    return this.artistService.findAll();
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Should be an id of a artist that exists in the database',
    type: 'string',
  })
  @ApiOkResponse({
    description: 'A artist has been successfully fetched',
    type: Artist,
  })
  @ApiBadRequestResponse({
    description: 'A artist with given id is invalid (not uuid).',
  })
  @ApiNotFoundResponse({
    description: 'A artist with given id does not exist.',
  })
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
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Should be an id of a artist that exists in the database',
    type: 'string',
  })
  @ApiBody({
    type: UpdateArtistDto,
    description: 'A new name and grammy for the artist',
  })
  @ApiOkResponse({
    description: 'A artist has been successfully updated',
    type: Artist,
  })
  @ApiBadRequestResponse({
    description: 'A artist with given id is invalid (not uuid).',
  })
  @ApiNotFoundResponse({
    description: 'A artist with given id does not exist.',
  })
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
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Should be an id of a artist that exists in the database',
    type: 'string',
  })
  @ApiNoContentResponse({
    description: 'A artist has been successfully deleted',
  })
  @ApiBadRequestResponse({
    description: 'A artist with given id is invalid (not uuid).',
  })
  @ApiNotFoundResponse({
    description: 'A artist with given id does not exist.',
  })
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
