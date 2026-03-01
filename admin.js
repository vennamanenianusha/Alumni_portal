import express from 'express';
import { sql } from './server.js';

const router = express.Router();

/* GET students by batch */
router.get('/students/:batch', async (req, res) => {
  const batch = parseInt(req.params.batch);

  try {
    const students = await sql`
      SELECT id, mail_id, mail_id_iim
      FROM "Studentslist_2025"
      ORDER BY id
    `;
    res.json(students);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch students' });
  }
});

/* UPDATE student */
router.put('/students/:id', async (req, res) => {
  const { id } = req.params;
  const { mail_id, mail_id_iim } = req.body;

  try {
    await sql`
      UPDATE "Studentslist_2025"
      SET mail_id = ${mail_id},
          mail_id_iim = ${mail_id_iim}
      WHERE id = ${id}
    `;

    res.json({ message: 'Student updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Update failed' });
  }
});

/* DELETE student */
router.delete('/students/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await sql`
      DELETE FROM "Studentslist_2025"
      WHERE id = ${id}
    `;

    res.json({ message: 'Student deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Delete failed' });
  }
});
/* GET placements */
router.get('/placements', async (req, res) => {
  try {
    const placements = await sql`
      SELECT * FROM "Placement_list" ORDER BY id
    `;
    res.json(placements);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to load placements' });
  }
});

/* ADD placement */
router.post('/placements', async (req, res) => {
  const { role, company, date_posted, skills_required } = req.body;

  try {
    const result = await sql`
      INSERT INTO "Placement_list"(role, company, date_posted, skills_required)
      VALUES (${role}, ${company}, ${date_posted}, ${skills_required})
      RETURNING *;
    `;
    res.json(result[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Insert failed' });
  }
});

/* UPDATE placement */
router.put('/placements/:id', async (req, res) => {
  const { role, company, date_posted, skills_required } = req.body;

  try {
    await sql`
      UPDATE "Placement_list"
      SET role=${role},
          company=${company},
          date_posted=${date_posted},
          skills_required=${skills_required}
      WHERE id=${req.params.id};
    `;
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Update failed' });
  }
});

/* DELETE placement */
router.delete('/placements/:id', async (req, res) => {
  try {
    await sql`
      DELETE FROM "Placement_list"
      WHERE id=${req.params.id}
    `;
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Delete failed' });
  }
});


export default router;
