import http from 'http';
import { logger } from '../config/logger';
import apollo from './apollo';

const onError = (port, error) => {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;

  switch (error.code) {
    case 'EACCES':
      logger.warn(`${bind} requires elevated privileges`);
      // eslint-disable-next-line no-process-exit
      process.exit(1);
    case 'EADDRINUSE':
      logger.warn(`${bind} is already in use`);
      // eslint-disable-next-line no-process-exit
      process.exit(1);
    default:
      throw error;
  }
};

const onListening = server => {
  const addr = server.address();
  const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
  logger.info(`Listening on ${bind} 🚀`);
};

const createServer = (app, port) => {
  const server = http.createServer(app);

  apollo.applyMiddleware({ app });
  apollo.installSubscriptionHandlers(server);
  server.listen(port);
  server.on('error', onError.bind(null, port));
  server.on('listening', onListening.bind(null, server));

  return server;
};

export { createServer };
