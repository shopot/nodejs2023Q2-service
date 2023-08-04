import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Artist } from '../../artists/entities/artist.entity';
import { Album } from '../../albums/entities/album.entity';

@Entity({ name: 'track' })
export class Track {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column({ nullable: false })
  name: string;

  @ApiProperty()
  @Column({ nullable: true })
  artistId: string | null;

  @ApiProperty()
  @Column({ nullable: true })
  albumId: string | null;

  @ApiProperty()
  @Column({ default: 0 })
  duration: number;

  @ManyToOne(() => Artist)
  @JoinColumn()
  artist: Artist;

  @ManyToOne(() => Album)
  @JoinColumn()
  album: Album;
}
