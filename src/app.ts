import express, { Application } from 'express';
import morgan from 'morgan';

import AuthController from './Routes/Auth'
import TaskController from './Routes/Task'

const app: Application = express();

// settings
app.set('port', process.env.PORT);

// Middlewares
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.use('/api/auth', AuthController);
app.use('/api/tasks', TaskController)

export default app;
