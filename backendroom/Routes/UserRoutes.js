const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Route to add a new user
router.post('/add', async (req, res) => {
    try {
        const { username, email, password, isAdmin } = req.body;

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            email,
            password: hashedPassword, // Store the hashed password
            isAdmin,
        });

        await newUser.save();

        res.status(201).json({ message: 'User added successfully!' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to add user' });
    }
});

// Route to fetch all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch users' });
    }
});

// Route to login a user
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Compare the password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Create a JWT token
        const token = jwt.sign({ userId: user._id }, 'your_jwt_secret', {
            expiresIn: '1h',
        });

        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});
router.get('/verifyToken', (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'No token provided' });

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(401).json({ message: 'Invalid token' });
        res.status(200).json({ message: 'Token is valid' });
    });
});

module.exports = router;





// const express = require('express');
// const router = express.Router();
// const User = require('../models/User');

// router.post('/add', async (req, res) => {
//     try {
//         const { username, email, password, isAdmin } = req.body;

//         const newUser = new User({
//             username,
//             email,
//             password,
//             isAdmin
//         });

//         await newUser.save();

//         res.status(201).json({ message: 'User added successfully!' });
//     } catch (error) {
//         res.status(500).json({ error: 'Failed to add user' });
//     }
// });

// router.get('/', async (req, res) => {
//     try {
//         const users = await User.find();
//         res.json(users);
//     } catch (error) {
//         res.status(500).json({ error: 'Failed to fetch users' });
//     }
// });

// module.exports = router;
