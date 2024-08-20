const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoutes');
const sequelize = require('./util/database');

// Middleware
app.use(express.json());
app.use(express.static('public'));

// Routes
app.use('/api/users', userRoutes);

// Database Connection and Server Start
sequelize.sync()
  .then(() => {
    app.listen(3000, () => {
      console.log('Server running on http://localhost:3000');
    });
  })
  .catch(err => console.log('Database connection failed:', err));
