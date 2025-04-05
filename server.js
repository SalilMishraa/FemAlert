const express = require('express');
const connectDB = require('./server/config/db'); // Corrected path
const userRoutes = require('./server/routes/users');
const overseerRoutes = require('./server/routes/overseers');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json()); // Parses incoming JSON requests

// Routes
app.use('/api/users', userRoutes);
app.use('/api/overseers', overseerRoutes);

// Default route
app.get('/', (req, res) => {
  res.send('FemAlert Backend is running 🚨');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
