/**
 * Notes:
 * - This file's only job is to turn the server on.
 * - Like the power button to a pc
 */
require("dotenv").config();

const app = require("./app");

const PORT = process.env.PORT || 3000;

// Starts the server
app.listen(PORT, () => {
  console.log(`Tiny Thinkers server running on port ${PORT}`);
});
