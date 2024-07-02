// const { urlencoded } = require('express');
const { MongoClient } = require('mongodb');


const uri = "mongodb+srv://dhruvchoudhary88649:thundercoder@cluster0.xveiygm.mongodb.net/?retryWrites=true&w=majority&AppName=Cluster0";

let client;
let db;


 async function connectToDb(){

    client = new MongoClient(uri)

    await client.connect();
    db =   client.db('Kasturi');
    
    console.log('mongo db is connected with Kasturi')
    




}

async function closedb(){
   if(client){
    await client.close();
    client = null;
    console.log('Connection closed');
   }
}

const DB = ()=> db;
module.exports= { connectToDb , DB , closedb }

