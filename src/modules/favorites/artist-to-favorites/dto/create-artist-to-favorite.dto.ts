import { IsUUID } from 'class-validator';

export class CreateArtistToFavoriteDto {
  @IsUUID(4)
  id: string;
}
