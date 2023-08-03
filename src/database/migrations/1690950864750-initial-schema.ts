import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class InitialSchema1690950864750 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'user',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
            isNullable: false,
          },
          {
            name: 'login',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'password',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'version',
            type: 'integer',
            isNullable: false,
            default: 1,
          },
          {
            name: 'createdAt',
            type: 'timestamptz',
            isNullable: false,
            default: 'now()',
          },
          {
            name: 'updatedAt',
            type: 'timestamptz',
            isNullable: false,
            default: 'now()',
          },
        ],
      }),
    );

    await queryRunner.createTable(
      new Table({
        name: 'album',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
            isNullable: false,
          },
          {
            name: 'name',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'year',
            type: 'integer',
            isNullable: false,
          },
          {
            name: 'artistId',
            type: 'uuid',
            isNullable: true,
          },
        ],
      }),
    );

    await queryRunner.createTable(
      new Table({
        name: 'artist',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
            isNullable: false,
          },
          {
            name: 'name',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'grammy',
            type: 'boolean',
            isNullable: false,
            default: false,
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'album',
      new TableForeignKey({
        columnNames: ['artistId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'artist',
        onDelete: 'SET NULL',
      }),
    );

    await queryRunner.createTable(
      new Table({
        name: 'track',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
            isNullable: false,
          },
          {
            name: 'name',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'duration',
            type: 'integer',
            isNullable: false,
            default: 0,
          },
          {
            name: 'albumId',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'artistId',
            type: 'uuid',
            isNullable: true,
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'track',
      new TableForeignKey({
        columnNames: ['albumId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'album',
        onDelete: 'SET NULL',
      }),
    );

    await queryRunner.createForeignKey(
      'track',
      new TableForeignKey({
        columnNames: ['artistId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'artist',
        onDelete: 'SET NULL',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    let table = await queryRunner.getTable('album');

    const foreignKeyAlbumToArtist = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('artistId') !== -1,
    );

    table = await queryRunner.getTable('track');

    const foreignKeyTrackToAlbum = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('albumId') !== -1,
    );

    const foreignKeyTrackToArtist = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('artistId') !== -1,
    );

    await queryRunner.dropForeignKey('album', foreignKeyAlbumToArtist);

    await queryRunner.dropForeignKey('track', foreignKeyTrackToAlbum);

    await queryRunner.dropForeignKey('track', foreignKeyTrackToArtist);

    await queryRunner.dropTable('user');

    await queryRunner.dropTable('album');

    await queryRunner.dropTable('artists');

    await queryRunner.dropTable('track');
  }
}
