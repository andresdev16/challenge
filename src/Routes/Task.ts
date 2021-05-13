import { Router } from 'express';
const router = Router();

import { newTask, getTasks, updateTask, deleteTask } from '../Controllers/Task'
import { TokenValidation } from '../Middleware/VerifyToken'

router.post('/newTask', TokenValidation, newTask);
router.get('/taskList', TokenValidation, getTasks);
router.put('/updateTask', TokenValidation, updateTask);
router.delete('/deleteTask', TokenValidation, deleteTask);

export default router