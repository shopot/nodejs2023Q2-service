import { IsUUID } from 'class-validator';

export class CreateAlbumToFavoriteDto {
  @IsUUID(4)
  id: string;
}
