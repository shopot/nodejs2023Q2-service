import { IsUUID } from 'class-validator';

export class DeleteArtistToFavoriteDto {
  @IsUUID(4)
  id: string;
}
