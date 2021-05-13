import { Request, Response } from "express"

import Task, { ITask } from "../Models/Task"
import { newTaskValidation } from "../DTOs/TaskDto"

export const newTask = async (req: Request, res: Response) => {
    //Validation
    const { error } = newTaskValidation(req.body);
    if (error) return res.status(400).json(error.message);

    //Validate if the name of task already exists
    const taskNameExists = await Task.findOne({ name: req.body.name });
    if (taskNameExists) return res.status(400).json('This task already exists')

    //Save a new Task
    try {
        const newTask: ITask = new Task({
            userId: req.userId,
            name: req.body.name,
            details: req.body.details,
            date: req.body.date,
            status: req.body.state,
            important: req.body.important
        });
        const saveTask = await newTask.save();
        res.status(200).json('Task created successfully')

    } catch (e) {
        res.status(400).json(e)
    }
};

export const getTasks = async (req: Request, res: Response) => {
    const tasks = await Task.find({ userId: req.body.userId });
    if (!tasks) {
        return res.status(404).json('You do not have tasks');
    }
    res.status(200).json(tasks);
}

export const updateTask = async (req: Request, res: Response) => {
    const task = await Task.findByIdAndUpdate(req.body.taskId, {
        $set: {
            name: req.body.name,
            details: req.body.details,
            date: req.body.date,
            status: req.body.status,
            important: req.body.important
        }
    })
    if (!task) {
        return res.status(404).json('Task not found')
    }
    res.status(200).json('Task updated successfully')
    
}

export const deleteTask = async (req: Request, res: Response) => {
    const task = await Task.deleteOne(req.body.taskId)
    if (!task) {
        return res.status(404).json('Task not found')
    }
    res.status(200).json('Task deleted successfully');
}