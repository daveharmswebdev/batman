import { Router } from 'express';
import {
  createPost,
  deletePostById,
  getAllPosts,
  getPostById,
  updatePostById,
} from '../controllers/postsController';

const router = Router();

router.get('/', getAllPosts);
router.get('/:id', getPostById);
router.post('/', createPost);
router.put('/:id', updatePostById);
router.delete('/:id', deletePostById);

export default router;
