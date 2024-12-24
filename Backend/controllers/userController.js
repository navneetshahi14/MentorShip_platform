const db = require('../config/db');


const getAllUsers = async (req, res) => {
  try {
    const query = 'SELECT * FROM users;';
    const result = await db.query(query);

    res.status(200).json(result.rows);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ error: 'Unable to fetch users' });
  }
};

module.exports = { getAllUsers };
