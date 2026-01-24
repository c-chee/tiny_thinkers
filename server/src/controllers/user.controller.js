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

exports.signup = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validation - no email, no pass
        if (!email || !password) {
        return res.status(400).json({ message: 'Email and password required' });
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
