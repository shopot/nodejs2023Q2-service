import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  UseFilters,
  UseInterceptors,
  HttpCode,
} from '@nestjs/common';
import { StatusCodes } from 'http-status-codes';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';

import { FavoritesService } from './favorites.service';
import { UuidDto } from '../common/dto';
import { HttpExceptionFilter } from '../common/filters';
import { TransformInterceptor } from '../common/interceptors';
import {
  HttpNotFoundException,
  HttpServerErrorException,
  HttpUnprocessableException,
  NotFoundErrorException,
  UnprocessableErrorException,
} from '../common/exceptions';
import { Favorite } from './entities/favorite.entity';

@Controller('favs')
@ApiTags('favs')
@UseFilters(new HttpExceptionFilter())
@UseInterceptors(new TransformInterceptor())
export class FavoritesController {
  constructor(private readonly favoriteService: FavoritesService) {}

  @Get()
  @ApiOkResponse({
    description: 'A artists has been successfully fetched',
    type: Favorite,
  })
  findAll() {
    return this.favoriteService.findAll();
  }

  /**
   * Add track to the favorites
   * @param UuidDto
   */
  @Post('/track/:id')
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
  createTrack(@Param() { id }: UuidDto) {
    try {
      return this.favoriteService.createTrack(id);
    } catch (err) {
      if (err instanceof UnprocessableErrorException) {
        throw new HttpUnprocessableException();
      }

      throw new HttpServerErrorException();
    }
  }

  /**
   * Delete track from favorites
   * @param UuidDto
   */
  @Delete('/track/:id')
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
  removeTrack(@Param() { id }: UuidDto) {
    try {
      return this.favoriteService.removeTrack(id);
    } catch (err) {
      if (err instanceof NotFoundErrorException) {
        throw new HttpNotFoundException();
      }

      throw new HttpServerErrorException();
    }
  }

  /**
   * Add album to the favorites
   * @param UuidDto
   */
  @Post('/album/:id')
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Should be an id of a album that exists in the database',
    type: 'string',
  })
  @ApiCreatedResponse({
    description: 'A album has been successfully added',
  })
  @ApiBadRequestResponse({
    description: 'A album with given id is invalid (not uuid).',
  })
  @ApiUnprocessableEntityResponse({
    description: 'A album with given id does not exist',
  })
  createAlbum(@Param() { id }: UuidDto) {
    try {
      return this.favoriteService.createAlbum(id);
    } catch (err) {
      if (err instanceof UnprocessableErrorException) {
        throw new HttpUnprocessableException();
      }

      throw new HttpServerErrorException();
    }
  }

  /**
   * Delete album from favorites
   * @param UuidDto
   */
  @Delete('/album/:id')
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Should be an id of a album that exists in the database',
    type: 'string',
  })
  @ApiNoContentResponse({
    description: 'A album has been successfully deleted',
  })
  @ApiBadRequestResponse({
    description: 'A album with given id is invalid (not uuid).',
  })
  @ApiNotFoundResponse({
    description: 'A album with given id does not exist.',
  })
  @HttpCode(StatusCodes.NO_CONTENT)
  removeAlbum(@Param() { id }: UuidDto) {
    try {
      return this.favoriteService.removeAlbum(id);
    } catch (err) {
      if (err instanceof NotFoundErrorException) {
        throw new HttpNotFoundException();
      }

      throw new HttpServerErrorException();
    }
  }

  /**
   * Add artist to the favorites
   * @param UuidDto
   */
  @Post('/artist/:id')
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
  createArtist(@Param() { id }: UuidDto) {
    try {
      return this.favoriteService.createArtist(id);
    } catch (err) {
      if (err instanceof UnprocessableErrorException) {
        throw new HttpUnprocessableException();
      }

      throw new HttpServerErrorException();
    }
  }

  /**
   * Delete artist from favorites
   * @param UuidDto
   */
  @Delete('/artist/:id')
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
  removeArtist(@Param() { id }: UuidDto) {
    try {
      return this.favoriteService.removeArtist(id);
    } catch (err) {
      if (err instanceof NotFoundErrorException) {
        throw new HttpNotFoundException();
      }

      throw new HttpServerErrorException();
    }
  }
}
