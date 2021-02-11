const mongoose = require("mongoose");
const product = require("./models/product");

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

const p = new product({
    name: 'Ruby',
    price: 1.99,
    category: 'fruit'
});

p.save().then(p=>{
    console.log(p);
})
.catch(e=>{
    console.log(e)
})