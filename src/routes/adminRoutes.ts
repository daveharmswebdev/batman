import { Router } from 'express';
import { getAdminReport } from '../controllers/adminController';
import passport from 'passport';
import { requireAdminRole } from '../middleware/requireAdminRole';

const router = Router();

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  requireAdminRole,
  getAdminReport,
);

export default router;
