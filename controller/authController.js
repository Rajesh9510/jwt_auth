// const User=require("../models/User")
// const jwt=require('jsonwebtoken')

// const createToken =(id)=>{
//     return jwt.sign({id},process.env.SECRET_TOKEN,{
//         expiresIn:2*2*60*60
//     })
// }

// const handleErrors=(err)=>{
//     console.log(err.message)
//     let objError={username:'',email:'',password:''}


//     // login method -POST
//     if(err.message === 'incorrect email')objError.email='that email is not registered'
//     if(err.message === 'incorrect password')objError.password='that password is incorrect'
//     if (err.code == 11000)
//     {
//         if(err.message.includes("username")){
//             objError.username ='username already exits'
//         }
//         if(err.message.includes("email")){
//             objError.email ='email already exits'
//         }
//         return objError
//     }
//     //validate error
//     if(err.message.includes('user validation failed')){
//         console.log(err.errors)
//         Object.values(err.errors).forEach(({properties})=>{
//             objError[properties.path]=properties.message
//         })
//     }
//     return objError
// }
// const signup_get=(req,res)=>{
//     res.render('signup',{mytitle:'AuthPage'})
// }

// const login_get=(req,res)=>{
//     res.render('login',{mytitle:'LoginPage'})
// }

// const signup_post=async(req,res)=>{
//     try {
//         const user=await User.create(req.body)
//         const token=createToken(user._id)
//         res.cookie("jwt",token,{
//             httpOnly:true,
//             maxAge:2* 24 *60 *60 *1000 //after 2 days cookies will expire
//         })
//         return res.status(201).json({user:user._id })
        
//     } catch (err) {
//         console.log(err.code)
//        let objError= handleErrors(err)
//         return res.status(400).json({objError})
//     }
// }

// const login_post=async(req,res)=>{
//     const {email,password}=req.body
//     try {
//         const user=await User.create(email,password)
//         const token=createToken(user._id)
//         res.cookie("jwt",token,{
//             httpOnly:true,
//             maxAge:2* 24 *60 *60 *1000 //after 2 days cookies will expire
//         })
//         return res.status(200).json({user:user._id ,body: req.body})
        
//     } catch (err) {
//         console.log(err.code)
//        let objError= handleErrors(err)
//         return res.status(400).json({objError})
//     }
// }

// module.exports= 
// {
//     signup_get,
//     login_get,
//     signup_post,
//     login_post
// }
const User = require("../models/User");
const jwt = require('jsonwebtoken');

const createToken = (id) => {
    return jwt.sign({ id }, process.env.SECRET_TOKEN, {
        expiresIn: '2h' // Set token expiry to 2 hours
    });
}

const handleErrors = (err) => {
    console.log(err.message);
    let objError = { username: '', email: '', password: '' };

    if (err.message === 'incorrect email') objError.email = 'that email is not registered';
    if (err.message === 'incorrect password') objError.password = 'that password is incorrect';
    if (err.code === 11000) {
        if (err.message.includes("username")) {
            objError.username = 'username already exits';
        }
        if (err.message.includes("email")) {
            objError.email = 'email already exits';
        }
        return objError;
    }
    if (err.message.includes('user validation failed')) {
        console.log(err.errors);
        Object.values(err.errors).forEach(({ properties }) => {
            objError[properties.path] = properties.message;
        });
    }
    return objError;
}

const signup_get = (req, res) => {
    res.render('signup', { mytitle: 'AuthPage' });
}

const login_get = (req, res) => {
    res.render('login', { mytitle: 'LoginPage' });
}

const signup_post = async (req, res) => {
    try {
        const user = await User.create(req.body);
        const token = createToken(user._id);
        res.cookie("jwt", token, {
            httpOnly: true,
            maxAge: 2 * 24 * 60 * 60 * 1000 //after 2 days cookies will expire
        });
        return res.status(201).json({ user: user._id });

    } catch (err) {
        console.log(err.code);
        let objError = handleErrors(err);
        return res.status(400).json({ objError });
    }
}

const login_post = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.login(email, password); // Use User.login for authentication
        const token = createToken(user._id);
        res.cookie("jwt", token, {
            httpOnly: true,
            maxAge: 2 * 24 * 60 * 60 * 1000 //after 2 days cookies will expire
        });
        return res.status(200).json({ user: user._id, body: req.body });

    } catch (err) {
        console.log(err.code);
        let objError = handleErrors(err);
        return res.status(400).json({ objError });
    }
}

const logout_get =async(req,res)=>{
     res.cookie('jwt','',{maxAge: 1})
     res.redirect('/')
}
module.exports = {
    signup_get,
    login_get,
    signup_post,
    login_post,
    logout_get
};

