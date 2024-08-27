import { Router } from 'express';
import {
  createPost,
  deletePostById,
  getAllPosts,
  getPostById,
  updatePostById,
} from '../controllers/postsController';
import { validateCreatePost } from '../validators/postsValidator';
import { redisCacheMiddleware } from '../middleware/redisCacheMiddleware';
import { cacheInvalidationMiddleware } from '../middleware/cacheInvalidationMiddleware';

const router = Router();

router.get(
  '/',
  redisCacheMiddleware(() => 'all_posts'),
  getAllPosts,
);
router.get(
  '/:id',
  redisCacheMiddleware((req) => `post_${req.params.id}`),
  getPostById,
);
router.post('/', validateCreatePost, cacheInvalidationMiddleware, createPost);
router.put('/:id', cacheInvalidationMiddleware, updatePostById);
router.delete('/:id', cacheInvalidationMiddleware, deletePostById);

export default router;
