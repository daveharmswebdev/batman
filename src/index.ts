import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import morgan from 'morgan';
import createError from 'http-errors';
import compression from 'compression';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yaml';
import fs from 'fs';
import cors from 'cors';

import * as configs from './config';
import logger from './logger';
import errorHandler from './middleware/errorHandler';
import redisClient from './services/redisClient';

const envFilePath = path.resolve(
  process.cwd(),
  `.env.${process.env.NODE_ENV} || 'development'`,
);

dotenv.config({ path: envFilePath });

const app = express();
const port = process.env.PORT || 3000;

const swaggerFile = fs.readFileSync(
  path.join(__dirname, '../swagger.yaml'),
  'utf8',
);
const swaggerDocument = YAML.parse(swaggerFile);

app.use(
  morgan('combined', {
    stream: { write: (message) => logger.info(message.trim()) },
  }),
);
app.use(express.json());
app.use(cors(configs.corsConfig));
app.use(compression(configs.compressionConfig));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

configs.routerConfig(app);
app.use(
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    next(createError(404, 'Resource Not Found'));
  },
);

app.use(errorHandler);

app.listen(port, () => {
  console.log('Server running on port: ' + port);

  redisClient
    .connect()
    .then((res) => {
      logger.info('Connected to Redis', res);
    })
    .catch((err) => {
      logger.error('Error connecting to Redis', err.message);
    });
});
