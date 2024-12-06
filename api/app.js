const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/users', userRoutes);

// Start server
const PORT = process.env.PORT || 4001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
