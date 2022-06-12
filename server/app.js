const express=require("express");
const app=express();
const port=8080;
const cors=require("cors");
const mongoose=require("mongoose")
const dotenv=require("dotenv");
dotenv.config();
const router=require("./routes/route");
const bodyParser=require("body-parser");
app.use(cors());
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.json());
mongoose.connect(process.env.dbURI,{useNewUrlParser:true,useUnifiedTopology:true}).then((res)=>{
    console.log("connected to db successfully");
    app.listen(process.env.PORT||port,()=>{
        console.log(`server started on port: ${port}`)
    })
}).catch(err=>console.log("error while connecting to db",err))
app.use("/",(req,res,next)=>{
    res.send("<h1>working successfully</h1>");
    res.end();
})
app.use("",router);
