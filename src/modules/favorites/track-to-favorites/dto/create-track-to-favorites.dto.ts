import { IsUUID } from 'class-validator';

export class CreateTrackToFavoritesDto {
  @IsUUID(4)
  id: string;
}
