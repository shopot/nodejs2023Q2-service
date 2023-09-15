import { Controller, Get, UseFilters, UseInterceptors } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { FavoritesService } from './favorites.service';
import { HttpExceptionFilter } from '../../common/filters';
import { TransformInterceptor } from '../../common/interceptors';
import { FavoritesDto } from './favorites.dto';

@Controller('favs')
@ApiTags('favs')
@UseFilters(new HttpExceptionFilter())
@UseInterceptors(new TransformInterceptor())
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  @ApiOkResponse({
    description: 'A artists has been successfully fetched',
    type: FavoritesDto,
  })
  async findAll() {
    return await this.favoritesService.findAll();
  }
}
