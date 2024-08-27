import { CorsOptions } from 'cors';

// @ts-ignore
const allowedOrigins = process.env.CORS_ALLOWED_ORIGIN.split(',');

const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`Origin: ${origin} is not allowed`));
    }
  },
  optionsSuccessStatus: 200,
  allowedHeaders: ['Content-Type', 'Authorization', 'RefreshToken'],
  exposedHeaders: ['Content-Length', 'Content-Type', 'RefreshToken', 'Token'],
};

export default corsOptions;
