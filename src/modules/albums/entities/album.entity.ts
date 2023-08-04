import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Artist } from '../../artists/entities/artist.entity';
import { Track } from '../../tracks/entities/track.entity';

@Entity({ name: 'album' })
export class Album {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column({ nullable: false })
  name: string;

  @ApiProperty()
  @Column({ nullable: false })
  year: number;

  @ApiProperty()
  @Column({ nullable: true })
  artistId: string | null;

  @ManyToOne(() => Artist)
  @JoinColumn()
  artist: Artist;

  @OneToMany(() => Track, (track) => track.album)
  @JoinColumn()
  tracks: Track[];
}
