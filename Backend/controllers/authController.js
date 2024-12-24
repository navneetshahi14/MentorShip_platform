const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const db = require('../config/db')
const dotenv = require('dotenv')
dotenv.config()

const register = async (req,res) => {
    const {email,password} = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password,10);

        const query = 'INSERT INTO users (email,password,created_at) VALUES ($1,$2,NOW()) RETURNING *;'
        const values = [email,hashedPassword];

        const result = await db.query(query,values)
        const user = result.rows[0]
        res.status(201).json({message:"User Registered successfully",user})
    } catch (error) {
        console.error('Error registered user:',error)
        res.status(500).json({error:"User resgistration failed"})
    }
}

const login = async(req,res) =>{
    const {email,password} = req.body
    try {
        const query = `SELECT * FROM users WHERE email = $1`
        const result = await db.query(query,[email])

        if(result.rows.length === 0){
            return res.status(404).json({error:'User not found'})
        }

        const user = result.rows[0]
        const isPasswordValid = await bcrypt.compare(password,user.password)

        if(!isPasswordValid){
            return res.status(401).json({error:"Invalid User Credentials"})
        }

        const token = jwt.sign({userId:user.user_id},process.env.JWT_SECERT,{expiresIn:'1h'})
        res.status(200).json({message:"Login successful",token})
    } catch (error) {
        console.log('Error logging in:',error)
        res.status(500).json({error:'Login failed'})
    }
}

module.exports = {register,login}