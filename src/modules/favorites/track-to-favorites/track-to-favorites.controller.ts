import {
  Controller,
  Post,
  Param,
  Delete,
  UseFilters,
  UseInterceptors,
  HttpCode,
  NotFoundException,
  InternalServerErrorException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { StatusCodes } from 'http-status-codes';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiParam,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';

import { HttpExceptionFilter } from '../../../common/filters';
import { TransformInterceptor } from '../../../common/interceptors';
import {
  AppNotFoundError,
  AppUnprocessableError,
} from '../../../common/exceptions';
import { CreateTrackToFavoritesDto } from './dto/create-track-to-favorites.dto';
import { DeleteTrackToFavoritesDto } from './dto/delete-track-to-favorites.dto';
import { TrackToFavoritesService } from './track-to-favorites.service';

@Controller('favs/track')
@ApiTags('favs/track')
@UseFilters(new HttpExceptionFilter())
@UseInterceptors(new TransformInterceptor())
export class TrackToFavoritesController {
  constructor(private readonly track2fService: TrackToFavoritesService) {}

  @Post(':id')
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Should be an id of a track that exists in the database',
    type: 'string',
  })
  @ApiCreatedResponse({
    description: 'A track has been successfully added',
  })
  @ApiBadRequestResponse({
    description: 'A track with given id is invalid (not uuid).',
  })
  @ApiUnprocessableEntityResponse({
    description: 'A track with given id does not exist',
  })
  async createTrack(@Param() { id }: CreateTrackToFavoritesDto) {
    try {
      return await this.track2fService.createTrack(id);
    } catch (err) {
      if (err instanceof AppUnprocessableError) {
        throw new UnprocessableEntityException();
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
  async removeTrack(@Param() { id }: DeleteTrackToFavoritesDto) {
    try {
      return await this.track2fService.removeTrack(id);
    } catch (err) {
      if (err instanceof AppNotFoundError) {
        throw new NotFoundException();
      }

      throw new InternalServerErrorException();
    }
  }
}
