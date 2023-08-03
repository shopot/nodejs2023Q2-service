import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Track } from '../../../tracks/entities/track.entity';

@Entity({ name: 'track_to_favorite' })
export class TrackToFavorite {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ nullable: false })
  trackId: string;

  @OneToOne(() => Track)
  @JoinColumn()
  track: Track;
}
