import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateAlbumDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsNotEmpty()
  year: number;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  artistId?: string | null;
}
