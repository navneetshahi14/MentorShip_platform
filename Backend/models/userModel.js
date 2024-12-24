const db = require('../config/db')

const createUser = async(email,passwordHash) =>{
    try{

        const result = await db.query(
            "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING user_id, email",
            [email,passwordHash]
        )
        return result.rows[0];
    }catch(err){
        console.error("Error creating user:",err.stack)
        throw err
    }
}

const findUserByEmail = async(email) =>{
    try{
        const result = await db.query('SELECT * FROM users WHERE email = $1',[email]);
        return result.rows[0];
    }catch(error){
        console.error('Error finding user by email:',error.stack);
        throw error;
    }
}

const updateUser = async(userId,newEmail,newPasswordHash) =>{
    try{
        const result = await db.query(
            'UPDATE users SET email = $1, password = $2 WHERE user_id = $3 RETURNING user_id,email',
            [newEmail,newPasswordHash,userId]
        )
        return result.rows[0];
    }catch(error){
        console.error("Error updating user:",error.stack)
        throw error
    }
}

const deleteUser = async(userId) =>{
    try{
        await db.query("DELETE FROM users WHERE user_id = $1",[userId])
        return {message:"User deleted successfully"};

    }catch(error){
        console.error('Error deleting user:',error.stack)
        throw error;
    }
}

module.exports = {
    createUser,
    findUserByEmail,
    updateUser,
    deleteUser
}