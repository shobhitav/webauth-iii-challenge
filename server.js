const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken')




const db = require('./data/dbConfig.js');
 const Users = require('./users/user-model.js');

 const authRouter = require('./auth/auth-router.js');
 const usersRouter = require('./users/user-router.js');


 const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());


server.use('/api/auth', authRouter);
server.use('/api/users', usersRouter);



server.get('/', (req, res) => {
  res.send("<h1>It's Working!<h1>");
});

server.get('/token',(req,res) =>{
    const payload={
      subject:"user",
      username:"captain",
      favoriteChilli:"jalapeno"
    };
  
    const secret ="it is secret";
    
    const options={
      expiresIn:"1h"
    }
  
  
  const token =jwt.sign(payload,secret,options);
   console.log(token);

  
  res.json(token);
  })
module.exports = server;