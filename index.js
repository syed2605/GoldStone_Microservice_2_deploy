const express = require('express');
const axios = require('axios');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json()); 
const env=require('dotenv').config();
const connect = require('./db/connect');
const port = process.env.PORT;



const userSchema = new mongoose.Schema({
    id: Number,
    name: String,
    email: String,
    gender: String,
    status: String,
    createdAt: Date,
    updatedAt: Date,
  });
  const User = mongoose.model('Gold_Stone_User', userSchema);


app.put('/users/:id', async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  try {
    await User.findOneAndUpdate({ id }, updatedData);
    res.send('User data updated successfully.');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error occurred while updating user data.');
  }
});


app.get('/', (req, res) => {
    res.send('Hello! Welcome to MicroService2 - where you can make a put request & change the data specific user with the help of respective ID');
}); 

connect()
.then(() => {
    app.listen(port, () => {
        console.log(`Server listening on http://localhost:${port}`);
    })
})
.catch((err) => {
    console.log('Server failed')
})
