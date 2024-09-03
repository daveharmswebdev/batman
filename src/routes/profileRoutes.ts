import { Router } from 'express';
import {
  createProfile,
  getAllProfiles,
  getProfileById,
  updateProfile,
} from '../controllers/profileController';
import passport from 'passport';
import { validateSchema } from '../validators/validate';
import { createProfileSchema } from '../validators/profileValidators';

const router = Router();

router.get('/', getAllProfiles);

router.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  // @ts-ignore
  getProfileById,
);

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  validateSchema(createProfileSchema),
  createProfile,
);

router.put(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  updateProfile,
);

// router.post('/', createProfile);
// router.put('/id', updateProfile);
// router.delete(':/id', deleteProfileById);

export default router;
