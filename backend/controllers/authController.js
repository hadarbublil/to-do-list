import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET_KEY; 

export const signup = async (req, res) => {
    try {
        const { username, password, phoneNumber } = req.body;
        const userExists = await User.findOne({ where: { username } });
        if (userExists) return res.status(400).json({ message: 'User already exists' });

        const user = await User.create({ username, password, phoneNumber });
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const signin = async (req, res) => {
    console.log(`JWT=${JWT_SECRET}`);
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ where: { username } });
        if (!user) return res.status(400).json({ message: 'Invalid username or password' });

        const isPasswordValid = await bcrypt.compare(password, user.password);
        console.log(`isPasswordValid=${isPasswordValid}`);
        if (!isPasswordValid) return res.status(400).json({ message: 'Invalid username or password' });

        const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });
        console.log(`token=${token}`);
        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Middleware to protect routes
export const authenticate = (req, res, next) => {
    console.log(`req=${req}`);
    console.log(`headers=${req.headers}`);
    const token = req.header('Authorization');
    console.log(`token in authenticate = ${token}`);
    if (!token) return res.status(401).json({ message: 'Access denied' });

    try {
        const decoded = jwt.verify(token.replace('Bearer ', ''), JWT_SECRET);
        req.userId = decoded.userId;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
};
