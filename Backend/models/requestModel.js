const db = require("../config/db");

const createRequest = async (senderId, receiverId, status = "pending") => {
  try {
    const query = `
            INSERT INTO mentorship_requests(senderId,receiverId,status,create_at,updated_at)
            VALUES ($1, $2, $3, NOW(), NOW())
            RETURNING *;
        `;
    const values = [senderId, receiverId, status];

    const result = await db.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error("Error creating request:", err);
    throw err;
  }
};

const getRequestsBySenderId = async (senderId) => {
  try {
    const query = "SELECT * FROM mentorship_requests WHERE sender_id = $1;";
    const values = [senderId];

    const result = await db.query(query, values);
    return result.rows;
  } catch (error) {
    console.error("Error fetching requests by sender:", error);
    throw error;
  }
};

const updateRequestStatus = async (requestId, status) => {
  try {
    const query = `
        UPDATE mentorship_requests
        SET status = $1, updated_at = NOW()
        WHERE request_id = $2
        RETURNING *;
      `;
    const values = [status, requestId];

    const result = await db.query(query, values);
    return result.rows[0];
  } catch (err) {
    console.error("Error updating request status:", err);
    throw err;
  }
};

const deleteRequest = async (requestId) => {
  try {
    const query =
      "DELETE FROM mentorship_requests WHERE request_id = $1 RETURNING *;";
    const values = [requestId];

    const result = await db.query(query, values);
    return result.rows[0];
  } catch (err) {
    console.error("Error deleting request:", err);
    throw err;
  }
};

module.exports = {
  createRequest,
  getRequestsBySenderId,
  getRequestsByReceiverId,
  updateRequestStatus,
  deleteRequest,
};
