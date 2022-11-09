const express = require('express');
const app = express();
const cors = require('cors')
const { MongoClient, ServerApiVersion } = require('mongodb');
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
        const photograpyCollection = client.db('wedding').collection('review')
        
        app.get('/services', async(req, res)=>{
            const query = {};
            const cursor = photograpyCollection.find(query);
            const services = await cursor.limit(3).toArray();
            res.send(services);
        })
    }

    finally{

    }
}

run().catch(err => console.log(err))



app.listen(port, ()=>{
    console.log(`wending server is running on: ${port}`)
})