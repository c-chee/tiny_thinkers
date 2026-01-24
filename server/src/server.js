/**
 * Notes:
 * - This file's only job is to turn the server on.
 * - Like the power button to a pc
 */
const app = require('./app');
require('dotenv').config();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
