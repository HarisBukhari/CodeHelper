const express = require('express')
const app = express()
const path = require("path")
const mongoose = require('mongoose')
// const Campground = require('./models/campground')
const methodOverride = require('method-override')
const ejsMate = require('ejs-mate')

app.use(express.json())
app.engine('ejs',ejsMate)
app.use(methodOverride('_method'))
app.use(express.urlencoded({extended:true}))


app.set('view engine','ejs')
app.set('views',path.join(__dirname,'/views'))


main().catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb://localhost:27017/campground',{
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  console.log("Connection Open")
}

app.get('/home',async (req,res)=>{
    res.render('index')
})

app.listen(3000,()=>{
  console.log("Server on 3000")
})