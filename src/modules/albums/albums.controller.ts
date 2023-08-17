import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  Put,
  UseInterceptors,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
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

import { AlbumsService } from './albums.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { UuidDto } from '../../common/dto';
import { TransformInterceptor } from '../../common/interceptors';
import { AppNotFoundError } from '../../common/exceptions';
import { Album } from './entities/album.entity';

@Controller('album')
@ApiTags('album')
@UseInterceptors(new TransformInterceptor())
export class AlbumsController {
  constructor(private readonly albumService: AlbumsService) {}

  @Post()
  @ApiBody({
    type: CreateAlbumDto,
    description: 'A name, year and artistId for the new album',
  })
  @ApiCreatedResponse({
    description: 'The album has been successfully created.',
    type: Album,
  })
  @ApiBadRequestResponse({
    description: 'Request body does not contain required fields',
  })
  async create(@Body() createAlbumDto: CreateAlbumDto) {
    return this.albumService.create(createAlbumDto);
  }

  @Get()
  @ApiOkResponse({
    description: 'A albums has been successfully fetched',
    type: [Album],
  })
  async findAll() {
    return await this.albumService.findAll();
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Should be an id of a album that exists in the database',
    type: 'string',
  })
  @ApiOkResponse({
    description: 'A album has been successfully fetched',
    type: Album,
  })
  @ApiBadRequestResponse({
    description: 'A album with given id is invalid (not uuid).',
  })
  @ApiNotFoundResponse({
    description: 'A album with given id does not exist.',
  })
  async findOne(@Param() { id }: UuidDto) {
    try {
      return await this.albumService.findOne(id);
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
    description: 'Should be an id of a album that exists in the database',
    type: 'string',
  })
  @ApiBody({
    type: UpdateAlbumDto,
    description: 'A new name, year or artistId for the album',
  })
  @ApiOkResponse({
    description: 'A album has been successfully updated',
    type: Album,
  })
  @ApiBadRequestResponse({
    description: 'A album with given id is invalid (not uuid).',
  })
  @ApiNotFoundResponse({ description: 'A album with given id does not exist.' })
  async update(
    @Param() { id }: UuidDto,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ) {
    try {
      return await this.albumService.update(id, updateAlbumDto);
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
    description: 'Should be an id of a album that exists in the database',
    type: 'string',
  })
  @ApiNoContentResponse({
    description: 'A album has been successfully deleted',
  })
  @ApiBadRequestResponse({
    description: 'A album with given id is invalid (not uuid).',
  })
  @ApiNotFoundResponse({ description: 'A album with given id does not exist.' })
  @HttpCode(204)
  async remove(@Param() { id }: UuidDto) {
    try {
      return await this.albumService.remove(id);
    } catch (err) {
      if (err instanceof AppNotFoundError) {
        throw new NotFoundException();
      }

      throw new InternalServerErrorException();
    }
  }
}
