const express = require('express');

const userRoutes = require('./routes/user_routes');
const learningRoutes = require('./routes/learning _routes');

const app = express();

app.use(express.json());



app.use('/api/learning', learningRoutes);

app.use('/api/users', userRoutes);

// app.use((req, res) => {
//     res.status(404).json({ error: 'Route not found'});
// });

module.exports = app;