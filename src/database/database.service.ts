import { Injectable } from '@nestjs/common';

import { databaseFactory, DatabaseInstance } from './factory/database.factory';

@Injectable()
export class DatabaseService {
  private database: DatabaseInstance;

  constructor() {
    this.database = databaseFactory.createInstance();
  }

  get users() {
    return this.database.users;
  }

  get artists() {
    return this.database.artists;
  }

  get tracks() {
    return this.database.tracks;
  }

  get albums() {
    return this.database.albums;
  }

  get favorites() {
    return this.database.favorites;
  }
}
