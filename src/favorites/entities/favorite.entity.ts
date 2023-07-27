import { ApiProperty } from '@nestjs/swagger';
import { Artist } from '../../artists/entities/artist.entity';
import { Album } from '../../albums/entities/album.entity';
import { Track } from '../../tracks/entities/track.entity';

export class Favorite {
  @ApiProperty()
  artists: Artist[];

  @ApiProperty()
  albums: Album[];

  @ApiProperty()
  tracks: Track[];
}
