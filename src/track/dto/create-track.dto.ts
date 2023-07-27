import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
export class CreateTrackDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsString()
  artistId?: string;

  @IsOptional()
  @IsString()
  albumId?: string;

  @IsNumber()
  @IsNotEmpty()
  duration: number;
}
