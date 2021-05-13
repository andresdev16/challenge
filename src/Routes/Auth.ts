import { Router } from 'express';
const router = Router();

import { signup, signin, profile, updateProfile } from '../Controllers/Auth'
import { TokenValidation } from '../Middleware/VerifyToken'

router.post('/signup', signup);
router.post('/signin', signin);
router.get('/profile', TokenValidation, profile);
router.put('/updateProfile', TokenValidation, updateProfile);

export default router;
