const express=require("express")
const app=express()
const bodyParser=require("body-parser")
const route=require("../BLOG/route/index")
app.use(bodyParser.json())
app.use(route)
app.listen(3000,()=>{
    console.log("listning")
})
