const mongoose = require("mongoose");
const express = require('express');
const app = express();
const ejsMate = require('ejs-mate');
const path = require('path');
const Farm = require('./models/farm');
const Product = require('./models/product');
const methodOverride = require('method-override');


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
app.use(methodOverride('_method'));



//Farms


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
    
    const { category } = req.query;
    if(category){
        const products = await Product.find({category})
        res.render("Product/index.ejs", {products, category})
    }
    else{
        const products = await Product.find({})
        res.render("Product/index.ejs", {products, category: 'All'})
    }
    
    //console.log(products)
    

})

const categories = ['fruit', 'vegetable', 'dairy'];
app.get('/new',(req, res)=>{
    res.render('Product/new.ejs',{categories});
})

app.post('/products',async(req, res)=>{
    const newProduct = new Product(req.body);
    await newProduct.save();
    //console.log(newProduct);
    res.redirect(`/products/${newProduct._id}`);

})

app.get('/products/:id/edit',async(req, res)=>{
    const {id}= req.params;
    const product= await Product.findById(id);
    res.render('Product/edit.ejs',{product, categories})

})

app.put('/products/:id',async(req, res)=>{
    const {id} = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body, {runValidators: true, new: true, useFindAndModify: false});
    //console.log(req.body);
    //res.send('put');
    res.redirect(`/products/${product._id}`)

})


app.get('/products/:id',async(req,res)=>{
    const {id}= req.params;
    const product= await Product.findById(id);
    res.render('Product/show.ejs',{product});
    //console.log(product);
})

app.delete('/products/:id',async(req, res)=>{
    const { id } = req.params;
    const deleteProduct = await Product.findByIdAndDelete(id);
    res.redirect('/products');
})




app.listen(7000,()=>{
    console.log('listening');
})