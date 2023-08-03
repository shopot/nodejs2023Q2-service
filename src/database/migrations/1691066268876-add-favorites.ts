import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class AddFavorites1691066268876 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'artist_to_favorite',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
            isNullable: false,
          },
          {
            name: 'artistId',
            type: 'uuid',
            isNullable: false,
          },
        ],
      }),
    );

    await queryRunner.createTable(
      new Table({
        name: 'album_to_favorite',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
            isNullable: false,
          },
          {
            name: 'albumId',
            type: 'uuid',
            isNullable: false,
          },
        ],
      }),
    );

    await queryRunner.createTable(
      new Table({
        name: 'track_to_favorite',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
            isNullable: false,
          },
          {
            name: 'trackId',
            type: 'uuid',
            isNullable: false,
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'artist_to_favorite',
      new TableForeignKey({
        columnNames: ['artistId'],
        referencedTableName: 'artist',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'album_to_favorite',
      new TableForeignKey({
        columnNames: ['albumId'],
        referencedTableName: 'album',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'track_to_favorite',
      new TableForeignKey({
        columnNames: ['trackId'],
        referencedTableName: 'track',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    let table = await queryRunner.getTable('artist_to_favorite');

    const foreignKeyArtist = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('artistId') !== -1,
    );

    table = await queryRunner.getTable('album_to_favorite');

    const foreignKeyAlbum = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('albumId') !== -1,
    );

    table = await queryRunner.getTable('track_to_favorite');

    const foreignKeyTrack = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('trackId') !== -1,
    );

    await queryRunner.dropForeignKey('artist_to_favorite', foreignKeyArtist);

    await queryRunner.dropForeignKey('album_to_favorite', foreignKeyAlbum);

    await queryRunner.dropForeignKey('track_to_favorite', foreignKeyTrack);

    await queryRunner.dropTable('artist_to_favorite');

    await queryRunner.dropTable('album_to_favorite');

    await queryRunner.dropTable('track_to_favorite');
  }
}
