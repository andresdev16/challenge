import { Request, Response } from 'express'

import User, { IUser } from '../Models/User'
import { signupValidation, signinValidation } from '../DTOs/UserDto'
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export const signup = async (req: Request, res: Response) => {
    // Validation
    const { error } = signupValidation(req.body);
    if (error) return res.status(400).json(error.message);

    // Email Validation
    const emailExists = await User.findOne({ email: req.body.email });
    if (emailExists) return res.status(400).json('Email already exists');

    // Saving a new User
    try {
        const newUser: IUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        });
        newUser.password = await newUser.encrypPassword(newUser.password);
        const savedUser = await newUser.save();

        const token: string = jwt.sign({ _id: savedUser._id }, process.env['TOKEN_SECRET'] || '', {
            expiresIn: 60 * 60 * 24
        });
        // res.header('auth-token', token).json(token);
        res.header('auth-token', token).json(savedUser);
    } catch (e) {
        res.status(400).json(e);
    }
};

export const signin = async (req: Request, res: Response) => {
    const { error } = signinValidation(req.body);
    if (error) return res.status(400).json(error.message);
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).json('Email or Password is wrong');
    const correctPassword = await user.validatePassword(req.body.password);
    if (!correctPassword) return res.status(400).json('Invalid Password');

    // Create a Token
    const token: string = jwt.sign({ _id: user._id }, process.env['TOKEN_SECRET'] || '');
    res.header('auth-token', token).json(token);
};

export const profile = async (req: Request, res: Response) => {
    const user = await User.findById(req.userId, { password: 0 });
    if (!user) {
        return res.status(404).json('User not found');
    }
    res.json(user);
};

export const updateProfile = async (req: Request, res: Response) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const user = await User.findByIdAndUpdate(req.userId, { 
        $set: { 
            username: req.body.username, 
            email: req.body.email,
            password: hashedPassword } 
    })
    if (!user) {
        return res.status(404).json('User not found')
    }
    res.status(200).json('User update successfully')
}
