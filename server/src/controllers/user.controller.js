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
const jwt = require('jsonwebtoken'); // Token creation

// === Signup ===
// POST /api/users/signup
exports.signup = async (req, res) => {
    try {
        const { email, password, first_name, last_name } = req.body; // Body fields

        // --- Validation for signup ---
        // Prevents empty users
        if (!email || !password || !first_name || !last_name) {
            return res.status(400).json({ message: 'All fields required' });
        }

        // --- Creates user ---
        const user = await userService.createUser(
            email,
            password,
            first_name,
            last_name
        );
        

        // 201 = resource created
        res.status(201).json({
            message: 'User created',
            userId: user.id,
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// === Login ===
// POST /api/users/login
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body; // Credential verification

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password required' });
        }

        const user = await userService.authenticateUser(email, password);

        // --- Create JWT token ---
        // Stores info in token and will explire in 1hr
        const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        // Response, ssends the token and user profile to the frontend
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
