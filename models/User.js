const mongoose = require('mongoose')
const {isEmail}=require('validator')
const bcrypt=require('bcrypt')

const userSchema= new mongoose.Schema({
     username:{
        type:String,
        require:[true,'please enter a username'],
        unique:true,
        minlength:[4,'minimum length is 4 character']
     },
     email:{
        type:String,
        require:[true,'please enter an email'],
        lowercase:true,
        unique:true,
        validate:[isEmail,'please enter valid email']
     },
     password:{
        type:String,
        require:[true,'please enter a password'],
        minlength:[6,'minimum password length is 6 character']
     }
})


//mongoose hooks before the doc is uploaded to the database
userSchema.pre('save',async function(){
   const salt = await bcrypt.genSalt();
   this.password=await bcrypt.hash(this.password,salt)
})

userSchema.statics.login =async function(email,password){
   //this = model User
   const user=await this.findOne({email})
   if(user){
      const auth=await bcrypt.compare(password,user.password)
      if(auth) return user
      throw new Error('incorrect password')
   }
   throw new Error('incorrect email')
}

//first argument is our collection name and second is schema
const User=mongoose.model('user',userSchema)

module.exports = User;


