import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
