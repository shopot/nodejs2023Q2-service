import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateTrackDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  artistId?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  albumId?: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  duration: number;
}
