import { Router } from 'express';
const router = Router();

import { signup, signin, profile } from '../Controllers/Auth'
import { TokenValidation } from '../Middleware/VerifyToken'

router.post('/signup', signup);
router.post('/signin', signin);
router.get('/profile', TokenValidation, profile)

export default router;
