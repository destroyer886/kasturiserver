// const { urlencoded } = require('express');
const { MongoClient } = require('mongodb');


const uri = "mongodb+srv://dhruvchoudhary88649:thundercoder@cluster0.xveiygm.mongodb.net/?retryWrites=true&w=majority&AppName=Cluster0";

let client;
let db;


 async function connectToDb(){

    client = new MongoClient(uri)

    await client.connect();
    db =   client.db('Kasturi');
    console.log(client)
    
    console.log('mongo db is connected with Kasturi')

  return{
   client
  }
  
    




}

const closedb = async ()=>{
  
      console.log('SIGTERM signal received: closing MongoDB client');
      if (client) {

         await client.close(false, (err) => {
            if (err) {
              console.error('Error closing MongoDB client', err);
              process.exit(1);
            } else {
              console.log('MongoDB client closed');
              process.exit(0);
            }
          });
          
      } else {
        console.log('loda bhenchod')
        process.exit(0);
      }

      // await client.close(false, (err) => {
      //    if (err) {
      //      console.error('Error closing MongoDB client', err);
      //      process.exit(1); // Exit with non-zero status on error
      //    } else {
      //      console.log('MongoDB client closed');
      //      process.exit(0); // Exit with success status
      //    }
      //  });
      console.log('closed')
   
    
}





const DB = ()=> db;
module.exports= { connectToDb , DB , closedb,client }

