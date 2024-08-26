import { Application } from 'express';
import postsRoutes from '../routes/postsRoutes';
import userRoutes from '../routes/userRoutes';

export default function (app: Application) {
  app.use('/api/posts', postsRoutes);
  app.use('/api/users', userRoutes);
}
