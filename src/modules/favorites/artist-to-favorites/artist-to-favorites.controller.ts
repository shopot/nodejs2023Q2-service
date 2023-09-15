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
import { ArtistToFavoritesService } from './artist-to-favorites.service';
import { DeleteArtistToFavoriteDto } from './dto/delete-artist-to-favorite.dto';
import { CreateArtistToFavoriteDto } from './dto/create-artist-to-favorite.dto';

@Controller('favs/artist')
@ApiTags('favs/artist')
@UseFilters(new HttpExceptionFilter())
@UseInterceptors(new TransformInterceptor())
export class ArtistToFavoritesController {
  constructor(private readonly artist2fService: ArtistToFavoritesService) {}

  @Post(':id')
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Should be an id of a artist that exists in the database',
    type: 'string',
  })
  @ApiCreatedResponse({
    description: 'A artist has been successfully added',
  })
  @ApiBadRequestResponse({
    description: 'A artist with given id is invalid (not uuid).',
  })
  @ApiUnprocessableEntityResponse({
    description: 'A artist with given id does not exist',
  })
  async createArtist(@Param() { id }: CreateArtistToFavoriteDto) {
    try {
      return await this.artist2fService.createArtist(id);
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
  async removeArtist(@Param() { id }: DeleteArtistToFavoriteDto) {
    try {
      return await this.artist2fService.removeArtist(id);
    } catch (err) {
      if (err instanceof AppNotFoundError) {
        throw new NotFoundException();
      }

      throw new InternalServerErrorException();
    }
  }
}
