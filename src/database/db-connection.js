import { logger } from '../config/logger';
import { EventEmitter } from 'events';

const firstUpper = word => {
  if (word && word.length) {
    return word[0].toUpperCase() + word.slice(1).toLowerCase();
  }
};

export class DbConnection extends EventEmitter {
  constructor (adapter, url, options) {
    super();
    this.adapter = firstUpper(adapter) || '';
    this.url = url;
    this.options = options || {};
    this.timer = null;
    this.sleepTime = 5000;
    this.init();
  }

  init () {}

  connect () {
    throw new Error('Connect db not implemented');
  }

  disconnect () {
    throw new Error('Disconnect db not implemented');
  }

  dropDatabase () {
    throw new Error('Drop database is not implemented');
  }

  dropCollection () {
    throw new Error('Drop collecttion is not implemented');
  }

  retryConnect () {
    this.timer = setTimeout(this.connect.bind(this), this.sleepTime);
  }

  onOpen () {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }

  onError (err) {
    logger.error(`[${this.adapter} DB]`, err.stack);
    this.disconnect();
  }

  onConnecting () {
    this.logInfo('Connecting...');
  }

  onConnected () {
    this.logInfo('Connected!');
    this.emit('connected');
  }

  onDisconnected () {
    this.logInfo('Disconnected!');
    this.emit('disconnected');
    this.retryConnect();
  }

  logInfo (message) {
    logger.info(`[${this.adapter} DB] ${message}`);
  }
}
