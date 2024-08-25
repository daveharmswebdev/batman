import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import userRoutes from './routes/userRoutes';
import postsRoutes from './routes/postsRoutes';

const envFilePath = path.resolve(
  process.cwd(),
  `.env.${process.env.NODE_ENV} || 'development'`,
);

dotenv.config({ path: envFilePath });

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use('/users', userRoutes);
app.use('/posts', postsRoutes);

app.listen(port, () => {
  console.log('Server running on port: ' + port);
});
