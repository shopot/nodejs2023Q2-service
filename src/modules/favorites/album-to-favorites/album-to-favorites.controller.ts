import {
  Controller,
  Post,
  Param,
  Delete,
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

import { TransformInterceptor } from '../../../common/interceptors';
import {
  AppNotFoundError,
  AppUnprocessableError,
} from '../../../common/exceptions';
import { AlbumToFavoritesService } from './album-to-favorites.service';
import { CreateAlbumToFavoriteDto } from './dto/create-album-to-favorite.dto';
import { DeleteAlbumToFavoriteDto } from './dto/delete-album-to-favorite.dto';

@Controller('favs/album')
@ApiTags('favs/album')
@UseInterceptors(new TransformInterceptor())
export class AlbumToFavoritesController {
  constructor(private readonly album2fService: AlbumToFavoritesService) {}

  @Post(':id')
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
  async createAlbum(@Param() { id }: CreateAlbumToFavoriteDto) {
    try {
      return await this.album2fService.createAlbum(id);
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
  async removeAlbum(@Param() { id }: DeleteAlbumToFavoriteDto) {
    try {
      return await this.album2fService.removeAlbum(id);
    } catch (err) {
      if (err instanceof AppNotFoundError) {
        throw new NotFoundException();
      }

      throw new InternalServerErrorException();
    }
  }
}
