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
