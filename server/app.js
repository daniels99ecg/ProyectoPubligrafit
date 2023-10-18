const express=require("express")
const resApi=require("./router/index")

const app=express()

app.use(express.json());

resApi(app)

app.listen(3001, ()=>{
    console.log("Server in line")
})