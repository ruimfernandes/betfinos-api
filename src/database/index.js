import { MongoConnection } from './mongo';

const adapters = {
  mongo: MongoConnection,
};

export function createDatabase (adapter, configs) {
  const Connection = adapters[adapter];
  configs = configs || {};

  if (!Connection) {
    throw new Error(`Adapter "${adapter}" does not exist`);
  } else if (!configs.url) {
    throw new Error(`Config ${adapter}.url is required`);
  } else {
    return new Connection(configs.url, configs.options);
  }
}

export default {
  createDatabase,
};
