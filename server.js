import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRouter from './auth.js';
import postgres from 'postgres';
import adminRoutes from './admin.js';
import profileRoutes from './routes/profile.js';



dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/api/admin', adminRoutes);
app.use('/api/student', profileRoutes);

// PostgreSQL connection using DATABASE_URL
export const sql = postgres(process.env.DATABASE_URL, {
  ssl: { rejectUnauthorized: false } // Supabase requires this
});

// Routes
app.use('/api/auth', authRouter);
console.log("JWT_SECRET:", process.env.JWT_SECRET);


// Health check
app.get('/', (req, res) => {
  res.send('Server running ✅');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
