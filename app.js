//app.js
const express = require("express")
const authRoutes = require('./routes/authRoutes')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const jwt=require('jsonwebtoken')
const {checkUser,requireAuth} = require('./middlewares/authMiddleware')

dotenv.config({ path: "./config/.env" });

const app = express()

const connectToDB = async () => {
    try {
        const PORT = process.env.PORT || 4000
        const conn=await mongoose.connect(process.env.MONGO_URI)

        app.listen(PORT, () => console.log(`port ${PORT} && mongoDB ${conn.connection.host}`))
    } catch (err) {
        console.log(`Catch Error: ${err.message} `)
    }
}
connectToDB()
app.set('view engine', 'ejs')

//middleware
app.use(express.static("public"))
app.use(express.json())//req.body
app.use(cookieParser())
app.get("/",checkUser,(req, res) => {
    res.render("home", { mytitle: "home" })
})

app.get("/cards", checkUser,requireAuth,(req, res) => {
    res.render("cards", { mytitle: "Cards" })
})


app.use(checkUser,authRoutes)

//404 error

app.get('*',(req,res)=>{
    res.redirect('/')
})
