import { IsUUID } from 'class-validator';

export class DeleteAlbumToFavoriteDto {
  @IsUUID(4)
  id: string;
}
