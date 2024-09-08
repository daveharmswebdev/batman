import { Application } from 'express';
import postsRoutes from '../routes/postsRoutes';
import userRoutes from '../routes/userRoutes';
import profileRoutes from '../routes/profileRoutes';
import adminRoutes from '../routes/adminRoutes';

export default function (app: Application) {
  app.use('/api/posts', postsRoutes);
  app.use('/api/users', userRoutes);
  app.use('/api/profile', profileRoutes);
  app.use('/api/admin', adminRoutes);
}
