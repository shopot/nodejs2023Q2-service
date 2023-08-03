import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Artist } from '../../../artists/entities/artist.entity';

@Entity({ name: 'artist_to_favorite' })
export class ArtistToFavorite {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ nullable: false })
  artistId: string;

  @OneToOne(() => Artist)
  @JoinColumn()
  artist: Artist;
}
