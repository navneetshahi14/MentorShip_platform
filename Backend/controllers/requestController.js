const db = require('../config/db');

const createRequest = async (req, res) => {
  const { senderId, receiverId } = req.body;
  try {
    const query = `
      INSERT INTO mentorship_requests (sender_id, receiver_id, status, created_at)
      VALUES ($1, $2, 'pending', NOW())
      RETURNING *;
    `;
    const values = [senderId, receiverId];
    const result = await db.query(query, values);

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error creating request:', err);
    res.status(500).json({ error: 'Unable to create request' });
  }
};

const getRequests = async (req, res) => {
  const { userId } = req.params;
  try {
    const query = `
      SELECT * FROM mentorship_requests
      WHERE receiver_id = $1 OR sender_id = $1;
    `;
    const result = await db.query(query, [userId]);

    res.status(200).json(result.rows);
  } catch (err) {
    console.error('Error fetching requests:', err);
    res.status(500).json({ error: 'Unable to fetch requests' });
  }
};

const updateRequestStatus = async (req, res) => {
  const { requestId } = req.params;
  const { status } = req.body; 
  try {
    const query = `
      UPDATE mentorship_requests
      SET status = $1, updated_at = NOW()
      WHERE request_id = $2
      RETURNING *;
    `;
    const values = [status, requestId];
    const result = await db.query(query, values);

    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error('Error updating request status:', err);
    res.status(500).json({ error: 'Unable to update request status' });
  }
};

module.exports = { createRequest, getRequests, updateRequestStatus };
