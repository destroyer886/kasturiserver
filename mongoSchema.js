// const { Collection } = require('mongodb');
const mongoose = require('mongoose');
const uri = "mongodb+srv://dhruvchoudhary88649:thundercoder@cluster0.xveiygm.mongodb.net/Kasturi?retryWrites=true&w=majority&AppName=Cluster0";
mongoose.connect(uri)

const tempScema = mongoose.Schema({
    heading: String,
    url: {type : String, unique: true},
    details: String,
    price : Number,
    tag: String
},
{
    collection : 'HomeProducts'
});

mongoose.model('HomeProducts' , tempScema)





