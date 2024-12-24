const db = require('../config/db')

const createProfile = async (userId,role,skills,interests,bio) =>{
    try{

        const query =  `
            INSERT INTO profiles(user_id, role, skills, interests, bio,created_at,updated_at) VALUES ($1, $2 , $3, $4, $5 ,NOW(),NOW()) RETURNING *;
        `;
        const values = [userId,role,skills,interests,bio];

        const result = await db.query(query,values)
        return result.rows[0]
        
    }catch(error){
        console.error("Error creating profile:",error)
        throw error;
    }
}

const getProfileByUserId = async (userId) =>{
    try{
        const query = 'SELECT * FROM profiles WHERE user_id = $1;'
        const values = [userId]

        const result = await db.query(query,values)
        return result.rows[0]
    }catch(error){
        console.error('Error fetching profile:',error);
        throw error
    }
}

const updateProfile = async (userId, {role,skills,interests,bio}) =>{
    try{
        const query = `
            UPDATE profiles
            SET role = $1, skills = $2,interests = $3,bio = $4,updated_at = NOW()
            WHERE user_id = $5
            RETURNING *;
        `

        const values = [role,skills,interests,bio,userId]

        const result = await db.query(query,values)
        return result.rows[0]

    }catch(error){
        console.error("Error updating profiles:",error)
        throw error
    }
}

const deleteProfileByUserId = async(userId) => {
    try{
        const query = 'DELETE FROM profiles WHERE user_id = $1 RETURNING *;'
        const values = [userId]

        const result = await db.query(query,values)
        return result.rows[0]
    }catch(error){
        console.error('Error deleting profile:',error)
        throw error;
    }
}

module.exports = {
    createProfile,
    getProfileByUserId,
    updateProfile,
    deleteProfileByUserId
}