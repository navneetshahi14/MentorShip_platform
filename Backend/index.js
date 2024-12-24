const express = require('express')
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const cors = require('cors')
const helmet = require('helmet')
const morgan = require("morgan")
const db = require('./config/db')

dotenv.config();

const app = express();

app.use(helmet())
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(morgan('dev'))


app.get('/',(req,res)=>{
    res.send("Welcome to the Mentorship Matching Platform API!")
})

db.query('SELECT NOW()', (err, res) => {
    if (err) {
      console.error('Error executing query:', err.stack);
    } else {
      console.log('Database connected successfully at:', res.rows[0].now);
    }
  });

const authRoutes = require('./routes/authRoutes');
const profileRoutes = require('./routes/profileRoutes');
const requestRoutes = require('./routes/requestRoutes');
const userRoutes = require('./routes/userRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/profiles', profileRoutes);
app.use('/api/requests', requestRoutes);
app.use('/api/users', userRoutes);


app.use((err,req,res,next)=>{
    console.error(err.stack)
    res.status(500).json({error:"Internal server error"})
})

const PORT = process.env.PORT || 5000
app.listen(PORT,()=>{
    console.log(`Server running on ${PORT}`)
})