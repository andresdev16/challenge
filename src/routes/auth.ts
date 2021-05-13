import { Router } from 'express';
const router = Router();

import { signup, signin, profile, updateProfile, updatePassword } from '../Controllers/Auth'
import { TokenValidation } from '../Middleware/VerifyToken'

router.post('/signup', signup);
router.post('/signin', signin);
router.get('/profile', TokenValidation, profile);
router.put('/updateProfile', TokenValidation, updateProfile);
router.put('/updatePassword', TokenValidation, updatePassword);

export default router;
