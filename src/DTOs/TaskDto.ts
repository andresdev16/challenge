import Joi from '@hapi/joi';
import { ITask } from '../Models/Task'

export const newTaskValidation = (data: ITask) => {
    const taskSchema = Joi.object({
        userId: Joi
            .string()
            .required(),
        name: Joi
            .string()
            .min(4)
            .required(),
        details: Joi
            .string()
            .default(null)
            .min(4),
        date: Joi
            .date()
            .required(),
        status: Joi
            .string()
            .default('Pending'),
        important: Joi
            .bool()
            .default(false)
    });
    return taskSchema.validate(data);
};