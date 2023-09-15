import { IsUUID } from 'class-validator';

export class DeleteTrackToFavoritesDto {
  @IsUUID(4)
  id: string;
}
