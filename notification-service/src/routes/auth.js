import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();

// Register endpoint
router.post('/register', async(req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create new user
        const user = new User({ email, password });
        await user.save();

        // Generate token
        const token = jwt.sign({ userId: user._id, email: user.email },
            process.env.JWT_SECRET, { expiresIn: '24h' }
        );

        res.status(201).json({ token, email: user.email });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Login endpoint
router.post('/login', async(req, res) => {
    try {
        const { email, password } = req.body;

        // Find user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Check password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate token
        const token = jwt.sign({ userId: user._id, email: user.email },
            process.env.JWT_SECRET, { expiresIn: '24h' }
        );

        res.json({ token, email: user.email });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;