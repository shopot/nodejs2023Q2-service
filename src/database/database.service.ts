import { Injectable } from '@nestjs/common';

import { databaseInstance, DatabaseInstance } from './database-instance';

@Injectable()
export class DatabaseService {
  private database: DatabaseInstance;

  constructor() {
    this.database = databaseInstance;
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
