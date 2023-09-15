import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Track } from '../../tracks/entities/track.entity';

@Entity({ name: 'artist' })
export class Artist {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column({ nullable: false })
  name: string;

  @ApiProperty()
  @Column({ nullable: false, default: false })
  grammy: boolean;

  @OneToMany(() => Track, (track) => track.artist)
  @JoinColumn()
  tracks: Track[];
}
