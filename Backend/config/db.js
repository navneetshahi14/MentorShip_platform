const {Pool} = require('pg')
const dotenv = require('dotenv')

dotenv.config()


const db = new Pool({
    user:process.env.DB_USER,
    host:process.env.DB_HOST,
    database:process.env.DB_NAME,
    password:process.env.DB_PASSWORD,
    port:process.env.DB_PORT
})

db.connect()
    .then(()=>console.log("Connected to the database"))
    .catch((err)=>console.log("Database connection error:",err))


module.exports = db