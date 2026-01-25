/**
 * Notes:
 * - The brain of the operation
 * - Rules
 */
const bcrypt = require('bcrypt');
const userQueries = require('../db/queries/user.queries');

// Signup
exports.createUser = async (email, password, first_name, last_name) => {
  // Check if user already exists
  // Search by the unique email
    const existingUser = await userQueries.findByEmail(email);
    if (existingUser) {
        throw new Error('User already exists');
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // Save user
    const userId = await userQueries.createUser(
        email,
        passwordHash,
        first_name,
        last_name
    );

    return { 
        id: userId 
    };
};

// Login
exports.authenticateUser = async (email, password) => {
    const user = await userQueries.findByEmail(email);

    if (!user) {
        throw new Error('Invalid email or password');
    }

    const valid = await bcrypt.compare(password, user.password_hash);

    if (!valid) {
        throw new Error('Invalid email or password');
    }

    return user; // return full user object for controller to generate token
};
