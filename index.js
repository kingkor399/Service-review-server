const express = require('express');
const app = express();
const cors = require('cors')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();
const port = process.env.PORT || 5000;

app.use(cors())
app.use(express.json())

app.get('/', (req, res)=>{
    res.send('server is running')
})

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.rdadvit.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try{
        const photograpyCollection = client.db('wedding').collection('review');
        const reviewCollection = client.db('wedding').collection('reviews');
        
        app.get('/services', async(req, res)=>{
            const query = {};
            const cursor = photograpyCollection.find(query);
            const services = await cursor.limit(3).toArray();
            res.send(services);
        })

        app.get('/allservice',  async(req, res)=>{
            const query = {};
            const cursor = photograpyCollection.find(query);
            const allservice = await  cursor.toArray();
            res.send(allservice);
        })

        app.get('/servicedetails/:id', async(req, res)=>{
            const id = req.params.id;
            const query = {_id: ObjectId(id)}
            const service = await photograpyCollection.findOne(query);
            res.send(service);
        })

        app.get('/reviews', async(req, res) =>{
            let query = {};
            const cursor = reviewCollection.find(query);
            const review = await cursor.toArray();
            res.send(review)
        })
        
        app.get('/myreview', async(req, res) =>{
            let query = {};
            if(req.query.email){
                query = {
                    email: req.query.email
                }
            }
            const cursor = reviewCollection.find(query);
            const reviews = await cursor.toArray();
            res.send(reviews)
        })


        app.post('/reviews', async(req, res) =>{
            const review =  req.body;
            const result = await reviewCollection.insertOne(review);
            res.send(result);
        })
        
    }

    finally{

    }
}

run().catch(err => console.log(err))



// app.listen(port, ()=>{
//     console.log(`wending server is running on: ${port}`)
// })