/**
 * Notes:
 * - Read request data, call services, send a response
 * - 'Heres my req, get me a res'
 * 
 * - Validate input
 * - Handle success/failure
 * - Talk HTTP

*/
const userService = require('../services/user.service');
const jwt = require("jsonwebtoken");

// Signup
exports.signup = async (req, res) => {
    try {
        const { email, password, first_name, last_name } = req.body;

        // Validation for signup
        if (!email || !password || !first_name || !last_name) {
            return res.status(400).json({ message: "All fields required" });
        }

        const user = await userService.createUser(email, password);
        

        res.status(201).json({
        message: 'User created',
        userId: user.id,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Login
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
        return res.status(400).json({ message: 'Email and password required' });
        }

        const user = await userService.authenticateUser(email, password);

        // Create JWT token
        const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '2h' }
        );

        res.json({
        message: 'Login successful',
        token,
        user: {
            id: user.id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email
        }
        });
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};
