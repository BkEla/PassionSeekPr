const mongoose = require('mongoose');
const express = require('express');
const server = express();
const path = require('path');
const ejs = require('ejs');

server.set('view engine', 'ejs')
server.get('/register', (req, res) =>{
  res.render('register')
})

/* 
const uri = 'mongodb+srv://bkelyas:Decisiv3@initalcluster.85vvqn4.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Error connecting to MongoDB', err);
});

*/


//serve static files from the parent directory
server.use(express.static(path.join(__dirname, '..')));

// Set up  a route handler for the root URL
server.get('/', (req, res) =>{
  res.sendFile(path.join(__dirname, '..', 'LandingPage.html'));
});






// Start the server
const port = process.env.port || 5000;
server.listen(port, () =>{
  console.log(`Server running on port ${port}`);
});

//console.log("First Log");


