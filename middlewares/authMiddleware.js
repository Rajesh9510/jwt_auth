const jwt = require("jsonwebtoken")
const User = require("../models/User")



const requireAuth = (req,res, next) => { 
  const token = req.cookies.jwt;
  
  if(!token){
    
    return res.status(401).redirect('/login'); 
  }

  jwt.verify(token, process.env.SECRET_TOKEN, (err, decodedToken) => {
    if(err){
     
      return res.status(401).redirect('/login'); 
    }

    console.log(decodedToken)
    next();
  })
}

const checkUser = (req,res,next) => { 
  const token = req.cookies.jwt;

  if(token){
    jwt.verify(token, process.env.SECRET_TOKEN, async (err, decodedToken) =>{
      if(err){
        console.log(`err message --->  ${err.message}`)
        res.locals.user = null;
        next();
      }
      else{
        console.log(decodedToken) 
        let user = await User.findById(decodedToken.id)

        res.locals.user = user;
        next();
      }
    })
  }
  else{
    res.locals.user = null;
    next();
  }
 }

module.exports = {
   checkUser, requireAuth
}