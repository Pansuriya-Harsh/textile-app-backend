const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
// require('./cronJobs/createFinancialYears');

const authRoutes = require('./routes/auth');
const financialRoutes = require('./routes/financialYearRoutes');
const partyRoutes = require('./routes/partyRoutes');
const recordRoutes = require('./routes/records');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/financial-years', financialRoutes);
app.use('/api/parties', partyRoutes);
app.use('/api/records', recordRoutes);

// DB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  })
  .catch(err => console.error('MongoDB connection error:', err));
