import express from 'express';
import { sql } from './server.js';
import jwt from 'jsonwebtoken';

const router = express.Router();

/* ================= STUDENT LOGIN ================= */
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const users = await sql`
      SELECT * FROM "Studentslist_2025"
      WHERE mail_id = ${email}
    `;

    console.log('Student query result:', users);

    if (users.length === 0) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const user = users[0];

    if (user.password !== password) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign(
      { id: user.id, role: 'student' },
      process.env.JWT_SECRET || 'supersecret',
      { expiresIn: '1h' }
    );

    res.json({
      token,
      user: {
        id: user.id,
        email: user.mail_id,
        role: 'student'
      }
    });

  } catch (err) {
    console.error('Student Auth Error:', err.message);
    res.status(500).json({ message: 'Server error, check database connection' });
  }
});


/* ================= ADMIN LOGIN ================= */
router.post('/admin-login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const admins = await sql`
      SELECT * FROM "Admin_list"
      WHERE mail_id = ${email}
    `;

    console.log('Admin query result:', admins);

    if (admins.length === 0) {
      return res.status(401).json({ message: 'Invalid admin credentials' });
    }

    const admin = admins[0];

    if (admin.password !== password) {
      return res.status(401).json({ message: 'Invalid admin credentials' });
    }

    const token = jwt.sign(
      { id: admin.id, role: 'admin' },
      process.env.JWT_SECRET || 'supersecret',
      { expiresIn: '1h' }
    );

    res.json({
      token,
      user: {
        id: admin.id,
        email: admin.email,
        role: 'admin'
      }
    });

  } catch (err) {
    console.error('Admin Auth Error:', err.message);
    res.status(500).json({ message: 'Server error, check database connection' });
  }
});

export default router;
