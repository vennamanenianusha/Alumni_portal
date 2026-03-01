import express from 'express';
import sql from '../db.js';

const router = express.Router();

/* GET PROFILE */
router.get('/profile/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const result = await sql`
      SELECT 
        "id",
        "Name",
        "mail_id",
        "mail_id_iim",
        "Phone_number",
        "Date_of_Birth",
        "password"
      FROM "Studentslist_2025"
      WHERE "id" = ${id};
    `;

    if (!result.length) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    res.json(result[0]);
  } catch (err) {
    console.error("PROFILE LOAD ERROR:", err);
    res.status(500).json({ message: 'Failed to load profile' });
  }
});

/* UPDATE PROFILE */
router.put('/profile/:id', async (req, res) => {
  const id = req.params.id;
  const {
    Name,
    mail_id,
    mail_id_iim,
    Phone_number,
    Date_of_Birth,
    password
  } = req.body;

  try {
    const result = await sql`
      UPDATE "Studentslist_2025"
      SET
        "Name" = ${Name ?? null},
        "mail_id" = ${mail_id ?? null},
        "mail_id_iim" = ${mail_id_iim ?? null},
        "Phone_number" = ${Phone_number ?? null},
        "Date_of_Birth" = ${Date_of_Birth ?? null},
        "password" = ${password ?? null}
      WHERE "id" = ${id}
      RETURNING *;
    `;

    if (!result.length) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    res.json(result[0]);
  } catch (err) {
    console.error("PROFILE UPDATE ERROR:", err);
    res.status(500).json({ message: 'Update failed' });
  }
});

export default router;
