const express=require("express")
const resApi=require("./router/index")
const cors=require("cors")  

const cookieParser=require('cookie-parser')
const app=express()

app.use(express.json());
app.use(cookieParser())

const corsOption={
    origin:"http://localhost:3001",
    methods:["POST", "GET"],
    credentials: true,
}

app.use(cors(corsOption))
app.use(express.static('uploads/imagenFicha'));
resApi(app)

app.listen(3001, ()=>{
    console.log("Server in line")
})