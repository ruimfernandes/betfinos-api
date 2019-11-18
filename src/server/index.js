import express from 'express';
import { createServer } from './server';

const start = config => {
  const { port } = config;
  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  return createServer(app, port);
};

export default { start };
