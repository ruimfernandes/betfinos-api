import dotenv from 'dotenv';

export const development = () => process.env.NODE_ENV !== 'production';

dotenv.config({ debug: development() });

const {
  PORT,
  MONGO_URI,
} = process.env;

export const server = {
  port: PORT,
};

export const db = {
  adapter: 'mongo',
};

export const mongo = {
  url: MONGO_URI,
  options: {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
};
export default {
  db,
  server,
  mongo,
};
