import { Controller, Get, Post, Param, Delete } from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { UuidDto } from '../common/dto';

@Controller('favs')
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}

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
    return this.favoriteService.createTrack(id);
  }

  /**
   * Delete track from favorites
   * @param UuidDto
   */
  @Delete('/track/:id')
  removeTrack(@Param() { id }: UuidDto) {
    return this.favoriteService.removeTrack(id);
  }

  /**
   * Add album to the favorites
   * @param UuidDto
   */
  @Post('/album/:id')
  createAlbum(@Param() { id }: UuidDto) {
    return this.favoriteService.createAlbum(id);
  }

  /**
   * Delete album from favorites
   * @param UuidDto
   */
  @Delete('/album/:id')
  removeAlbum(@Param() { id }: UuidDto) {
    return this.favoriteService.removeAlbum(id);
  }

  /**
   * Add artist to the favorites
   * @param UuidDto
   */
  @Post('/artist/:id')
  createArtist(@Param() { id }: UuidDto) {
    return this.favoriteService.createArtist(id);
  }

  /**
   * Delete artist from favorites
   * @param UuidDto
   */
  @Delete('/artist/:id')
  removeArtist(@Param() { id }: UuidDto) {
    return this.favoriteService.removeArtist(id);
  }
}
