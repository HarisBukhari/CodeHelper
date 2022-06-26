//hammad check
 
////////////////////////////////////  EXPRESS  ////////////////
//npm i express Nodemon ejs method-override
//npm init -y (y for quick start else remove it)
//npm i express Nodemon ejs


//Express
const express = require('express')
const app = express()
const axios = require("axios");
app.listen(3000,()=>{})

/////////Express Method-Override
app.use(methodOverride('_method'))
//ln form action add route type ?_method=path/put/delete....

//Express Json
app.use(express.json())
app.use(express.urlencoded({extended:true}))
    //POST Json
    app.post('/home',(req,res)=>{
    console.log(req.body)
    })

//Axios
const starwar = async (id)=>{
    const res = await axios.get(`http://swapi.dev/api/people/${id}`)
    console.log(res.data)
}


//EJS MVC views Folder and Path
const path = require("path")
app.set('view engine','ejs')
app.set('views',path.join(__dirname,'/views'))
    //Public file css/js...etc files origin links
    app.use(express.static(path.join(__dirname,'/public')))


//Express Params
app.get("/home/:name",(req,res)=>{
    const {name} = req.params
    res.send(`<h1>Hello User: ${name}</h1>`)
})
app.get("/home/:name/:place",(req,res)=>{
    const {name,place} = req.params
    res.send(`<h1>Hello User: ${name} and You are from ${place}</h1>`)
})


//Express Query
URL:http://localhost:3000/?a=Haris&b=PAKISTAN
app.get('/',(req,res)=>{
    const {a,b} = req.query
    console.log(a,b)
    res.send(`<h1>Hello User: ${a} and You are from ${b}</h1>`)
})


//Express Post Body
app.post('/home',(req,res)=>{
    console.log(req.body)
})


//////////Nodemon Issue
//Nodemon: even if globally not found 
//npx Nodemon app.js or what ever sever your are trying to run

//Anonymous function //Function which has no name is called Anonymous function.

function complex(add) {
  console.log(add(10, 20));
}

//anonymous function with callback
complex(function (a, b) {
  return a + b;
}); 

////////////////////////////////// MONGO /////////////////////////////
const mongoose = require('mongoose')

//Connection
main().catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb://localhost:27017/Zotac');
  console.log("Connection Open")
}

//Mongo Model
const movieschema = new mongoose.Schema({
    name:{
        type: String,
        required: [true,'Name cannot be blank'], //required condition with self made error string
        maxlenght: 20
    },
    year:Number,
    rating:{
        type: Number,
        min: 0
    }
    ,
    other_object:{
        other1:{
            type:String
        },
        other2:{
            type:Number
        }
    }
})
const Movie = mongoose.model('Movie',movieschema)
   
//Model Object
const obj1 = new Movie({
    name:'ABC',
    year:12,
    rating:8
})

obj1.save()