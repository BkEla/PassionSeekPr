const mongoose = require("mongoose");
const MongoClient = require('mongodb').MongoClient;
const express = require("express");
const uri = 'mongodb+srv://bkelyas:Decisiv3@initalcluster.85vvqn4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const app = express();


async function connect(){
    try{
        await mongoose.connect(uri);
        console.log("Connected to MongoDB");

    }
    catch (error){
        console.error(error);
    }
}
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});

connect();

app.listen(8000, ()=>{
console.log("server started on port 8000");
});