const express = require('express')
const {DB , connectToDb , closedb,client} =  require('./db')
const cors = require('cors');
const { ObjectId } = require('mongodb');

require('./mongoSchema');

const app = express();

app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


const PORT = 3000;










app.get('/',(req,res)=>{
    res.send('working')
});


app.post('/addproducts', async(req,res)=>{
    const {url, heading, detail, type ,price} = req.body;
    // console.log(url, heading, detail, type,price);
    // console.log(req.body)

    let data;
    try {
    
    
    const collection = db.collection('HomeProducts')
    await collection.insertOne({
        heading : heading,
        price : parseInt(price,10),
        url: `https://images.weserv.nl/?url=${url}&w=480&q=80`,
        details: detail,
        tag:type
    })


    data = await collection.find({}).toArray();
    // console.log(data)
    res.json({status : 'ok', data: data})
    } catch (error) {
        console.error
    }
})


app.get('/gethomeproducts', async (req,res)=>{
    
    
    const {tag} = req.query;
    // console.log(tag)
    let data;
    try {
    const db = DB();
    const collection = db.collection('HomeProducts')
    data = await collection.find(tag === 'All'? {} : {tag: tag}).toArray();
    res.json({status: 'ok',data: data})
    }catch(error){
        console.error(error)
        
    }

   

})

app.get('/search',async(req,res)=>{

    const {query} = req.query;
    
    const mainquery = {
        $or: [
         {heading : {$regex: new RegExp(query, 'i')}},
         // {email : {$regex: new RegExp(s, 'i')}}
        ]
       }
    let data;

    try {
       
        const db =  DB();
        const collection = db.collection('HomeProducts')
        data = await collection.find(mainquery).toArray();
    } catch (error) {
        console.error()
    }

    res.json({status : 'ok', data : data})

})

app.get('/product',async(req,res)=>{

    const {id} = req.query;
    
    
    let data;
    let db;
    try {
        
         db =  DB();
        const collection = db.collection('HomeProducts')
        data = await collection.findOne({_id :new ObjectId(id)});
        res.json({status : 'ok', data : data})
    } catch (error) {
        console.error(error)
        res.json({status : 'error', msg : 'server problem'})
    }
})

app.post('/savemyorders',async(req,res)=>{

    const order = req.body;
   
    let db;

    console.log(order)
    try {
       
        db = DB();
        const collection = db.collection('myorders')
        await collection.insertOne(order)
        res.json({status : 'ok',})
    } catch (error) {
        console.error(error)
        res.json({status : 'error', msg : 'server problem'})
    }
});

app.get('/getmyorders',async(req,res)=>{

    const {userId} = req.query;
   
    let db;
    let data;
    // console.log(order)
    try {
        
        db =  DB();
        const collection = db.collection('myorders')
        data = await collection.find({userId}).toArray();
        res.json({status : 'ok',data: data})
    } catch (error) {
        console.error(error,'error hai')
        res.status(500).json({status : 'error', msg : 'server problem'})
    }
})

app.post('/addtocart',async(req,res)=>{
    const data = req.body;


    let db;

    console.log(data)



    try {
        
        db = DB();
        const collection = db.collection('Cart');
        const check = await collection.find({userId : data.userId, id : data.id }).toArray();
        // console.log(check)

       if(check.length > 0){
        res.json({status :'exists'})
        console.log('exists',check.length)
        return
       }


        await collection.insertOne(data);
        res.json({status :'ok'})
    } catch (error) {
        console.error()
        res.status(500).json({error: error})
    }

    
})

app.get('/getcartdata',async(req,res)=>{
    // const data = req.body;
    const {userId} = req.query;
    let data;
    

    let db;

    try {
        
        db = DB();
        const collection = db.collection('Cart');


        data = await collection.find({userId}).toArray()
        res.json({status :'ok',data : data})
    } catch (error) {
        console.error(error)
        res.status(500).json({error: error})
    }

    
})

app.get('/removecartitem',async(req,res)=>{
    const{id,userId} = req.query;
    let db;

    console.log(id,userId)

    try {
        
        db = await DB();
        const collection = db.collection('Cart');
        await collection.deleteOne({userId, _id : new ObjectId(id)})
        res.json({status : 'ok'})
        console.log('delted')
    } catch (error) {
        console.error
    }
})



process.on('SIGTERM', () => closedb());



// app.listen(PORT,()=>{
//     console.log('sever is running')
// })

module.exports = app;
