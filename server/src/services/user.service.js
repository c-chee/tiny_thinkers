/**
 * Notes:
 * - The brain of the operation
 * - Rules
 */
const bcrypt = require('bcrypt');
const userQueries = require('../db/queries/user.queries');

exports.createUser = async (email, password) => {
  // Check if user already exists
  // Search by the unique email
    const existingUser = await userQueries.findByEmail(email);
    if (existingUser) {
        throw new Error('User already exists');
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // Save user
    const userId = await userQueries.createUser(email, passwordHash, first_name, last_name);

    return { 
        id: userId 
    };
};
