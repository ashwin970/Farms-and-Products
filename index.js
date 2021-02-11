const mongoose = require("mongoose");
const express = require('express');
const app = express();
const ejsMate = require('ejs-mate');
const path = require('path');
const Farm = require('./models/farm');
const Product = require('./models/product');


app.engine('ejs',ejsMate);
app.set('view engine','ejs');
app.set('views', path.join(__dirname,'views'));


mongoose.connect('mongodb://localhost:27017/farms',{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
    
});

const db = mongoose.connection;
db.on("error",console.error.bind(console, "connection error:"));
db.once("open",()=>{
    console.log("database connected");
})

app.use(express.urlencoded({extended:true}));
//app.use(methodOverride('_method'));

app.get('/farms',async(req,res)=>{
    const farms = await Farm.find({});
    res.render('index.ejs',{farms})

})

app.get('/farms/:id',async(req, res)=>{
    const farm = await Farm.findById(req.params.id);
    res.render('show.ejs',{farm})
})

app.post('/farms',async(req,res)=>{
    const farm = new Farm(req.body);
    await farm.save();
    res.redirect('/farms');
})

app.get('/',(req, res)=>{
    res.render('new.ejs');
})


//PRODUCTS

app.get('/products',async(req, res)=>{
    const products = await Product.find({})
    console.log(products)
    res.send('Products are here');

})

app.listen(7000,()=>{
    console.log('listening');
})