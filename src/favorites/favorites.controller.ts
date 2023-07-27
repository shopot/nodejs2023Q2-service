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

@Controller('favs')
@UseFilters(new HttpExceptionFilter())
@UseInterceptors(new TransformInterceptor())
export class FavoritesController {
  constructor(private readonly favoriteService: FavoritesService) {}

  @Get()
  findAll() {
    return this.favoriteService.findAll();
  }

  /**
   * Add track to the favorites
   * @param UuidDto
   */
  @Post('/track/:id')
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
