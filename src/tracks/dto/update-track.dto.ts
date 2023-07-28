import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class UpdateTrackDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsUUID(4)
  artistId?: string | null;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsUUID(4)
  albumId?: string | null;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  duration: number;
}
