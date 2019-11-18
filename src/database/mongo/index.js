import Q from 'q';
import mongoose from 'mongoose';

import { DbConnection } from '../db-connection';

export class MongoConnection extends DbConnection {
  constructor (url, options) {
    super('mongo', url, options);
  }

  init () {
    mongoose.Promise = Q.Promise;

    mongoose.connection
      .on('connecting', this.onConnecting.bind(this))
      .on('connected', this.onConnected.bind(this))
      .on('disconnected', this.onDisconnected.bind(this))
      .on('error', this.onError.bind(this))
      .on('open', this.onOpen.bind(this));
  }

  connect () {
    mongoose.connect(this.url, this.options);
  }

  disconnect () {
    mongoose.disconnect();
  }

  dropDatabase (cb) {
    mongoose.connection.db.dropDatabase(cb);
  }

  dropColection (collection, cb) {
    mongoose.connection.db.dropCollection(collection, cb);
  }

  close () {
    mongoose.connection.close(() => {
      this.logInfo('Connection closed on app termination');
    });
  }
}
