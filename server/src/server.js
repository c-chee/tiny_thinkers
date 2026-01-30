/**
 * Notes:
 * - This file's only job is to turn the server on.
 * - Like the power button to a pc
 */
<<<<<<< HEAD
require('dotenv').config(); // Loads env variables
=======
require('dotenv').config();
>>>>>>> 0b6f26e659f08f6fe59f956ee1bb2c3588a7991f

const app = require('./app');

const PORT = process.env.PORT || 3000;

// Starts the server
app.listen(PORT, () => {
  console.log(`Tiny Thinkers server running on port ${PORT}`); 
});
