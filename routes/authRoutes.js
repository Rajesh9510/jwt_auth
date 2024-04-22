//authRoutes.js
const {Router}=require('express')
const 
{
    signup_get,
    login_get,
    signup_post,
    login_post,
    logout_get
}=require('../controller/authController')

const router=Router();

function isUser(req,res,next){
      if(res.locals.user){
            return res.redirect('/')
      }
      next()
}

// router.get('/signup',signup_get)
// It allows you to chain HTTP methods (such as GET, POST, PUT, DELETE) for the same route.
router.route("/signup")
      .get(isUser,signup_get)
      .post(signup_post)

// router.get('/login',login_get)
router.route("/login")
      .get(isUser,login_get)
      .post(login_post)


router.route('/logout')
      .get(logout_get)


module.exports=router;