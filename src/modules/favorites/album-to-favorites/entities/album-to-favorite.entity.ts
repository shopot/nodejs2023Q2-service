import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Album } from '../../../albums/entities/album.entity';

@Entity({ name: 'album_to_favorite' })
export class AlbumToFavorite {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ nullable: false })
  albumId: string;

  @OneToOne(() => Album)
  @JoinColumn()
  album: Album;
}
