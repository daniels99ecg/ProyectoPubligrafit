const express=require("express")
const resApi=require("./router/index")
const cors =require('cors')
const cookieParser=require('cookie-parser')
const app=express()

app.use(express.json());
app.use(cookieParser())

app.use(cors())


resApi(app)

app.listen(3001, ()=>{
    console.log("Server in line")
})