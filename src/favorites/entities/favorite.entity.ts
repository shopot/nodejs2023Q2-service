import { ApiProperty } from '@nestjs/swagger';

export class Favorite {
  @ApiProperty()
  artists: string[];

  @ApiProperty()
  albums: string[];

  @ApiProperty()
  tracks: string[];
}
