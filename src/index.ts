import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import * as configs from './config';
import morgan from 'morgan';
import logger from './logger';
import createError from 'http-errors';
import errorHandler from './middleware/errorHandler';

const envFilePath = path.resolve(
  process.cwd(),
  `.env.${process.env.NODE_ENV} || 'development'`,
);

dotenv.config({ path: envFilePath });

const app = express();
const port = process.env.PORT || 3000;

app.use(
  morgan('combined', {
    stream: { write: (message) => logger.info(message.trim()) },
  }),
);
app.use(express.json());

configs.routerConfig(app);
app.use(
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    next(createError(404, 'Resource Not Found'));
  },
);

app.use(errorHandler);

app.listen(port, () => {
  console.log('Server running on port: ' + port);
});
