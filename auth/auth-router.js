const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt=require('jsonwebtoken')

const Users = require('../users/user-model.js');


//TO CREATE USER
router.post('/register', (req, res) => {
    let user = req.body;
  const hash=bcrypt.hashSync(user.password,12) 
  user.password =hash;
  //without hashing if you post the data,u can see the password as a text(and not hashed psswd)
    Users.add(user)
      .then(saved => {
        res.status(201).json(saved);
      })
      .catch(error => {
        res.status(500).json({message:error.message});
      });
  });
  
  
  
  
  // LOGIN USING SESSIONS
  router.post('/login', (req, res) => {
    let { username, password } = req.body;
  
    Users.findBy({ username })
      .first()
      .then(user => {
        if (user && bcrypt.compareSync(password, user.password)) {
          const token=genToken(user);
         
          res.status(200).json({
            message: `Welcome ${user.username} is logged in `, token
          });
        } else {
          res.status(401).json({ message: 'Invalid Credentials' });
        }
      })
      .catch(error => {
        res.status(500).json(error);
      });
  });
  
  function genToken(user){
    
    const payload= {
      subject:"user",
      username:user.username
    };

    const secret="it is secret";

    const options ={expiresIn :'1h'};

    return jwt.sign(payload,secret,options);
  }


  

  
  
  
  
  // //<<<<<<<<<<<<<<LOGOUT<<<<<<<<<<<<<<<<<<<<<<
  // router.delete('/logout',(req,res) =>{
  //   if (req.session){
  //         console.log(req.session);
  //         const username = req.session.user.username;
  //          req.session.destroy((err)=>{
  //                if(err){
  //                       res.status(400).send('unable to logout...')
  //                 }  else{
  //            res.send({bye :`Au Revoir ${username}!`})
  //           }
  //         });
  
  //        } else {
  //    res.end();
  //    }
  //   })

    module.exports = router;