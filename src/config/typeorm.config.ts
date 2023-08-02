import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { InitialSchema1690950864750 } from '../migrations/1690950864750-initial-schema';
import { User } from '../users/entities/user.entity';

config();

const configService = new ConfigService();

export default new DataSource({
  type: 'postgres',
  host: configService.get<string>('PG_HOST'),
  port: configService.get<number>('PG_PORT'),
  username: configService.get<string>('PG_USER'),
  password: configService.get<string>('PG_PASSWORD'),
  database: configService.get<string>('PG_DB'),
  logging: configService.get<boolean>('PG_LOGGING'),
  entities: [User],
  migrations: [InitialSchema1690950864750],
});
