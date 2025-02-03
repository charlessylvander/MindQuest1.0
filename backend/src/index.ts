import express from 'express';
import sequelize from './config/database';
import authRouter from './routes/auth';
import adminRouter from './routes/admin';
import schoolRouter from './routes/school';

const app = express();
app.use(express.json());

// Database connection
sequelize.authenticate()
  .then(() => console.log('Database connected'))
  .catch(err => console.error('Database connection failed:', err));

// Routes
app.use('/api/auth', authRouter);
app.use('/api/admin', adminRouter);
app.use('/api/school', schoolRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});