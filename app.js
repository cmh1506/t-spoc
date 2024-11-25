import express from 'express';
const app = express();
import database from './connection.js';
import { ObjectId } from 'mongodb';

// Find all 
app.get('/profiles', async (req, res) => {
  try {
    const collection = await database.collection('profiles')
    const results = await collection.find({followers: {$gte: 1000 }}).toArray()
    res.status(200).json(results)
  } catch (error) {
    //next(error)
  }
  
}); 

// Find one
app.get('/profiles/:id', async (req, res) => {
  try {
    const coll = await database.collection('profiles')
    const query = {_id: ObjectId.createFromHexString(req.params.id)}
    const result = await coll.findOne(query)
    res.status(200).json(result)
  } catch (error) {
    //next(error)
  }
});

// Insert One
app.post('/profiles', async (req, res) => {
  try {
    const coll = await database.collection('profiles')
    const result = await coll.insertOne({      
        "profile_id": 101,
        "first_name": "Claus",
        "last_name": "Heinrich",
        "company": "ABC Corp",
        "position": "Social Media Manager",
        "industry": "Fashion & Apparel",
        "location": "Los Angeles, CA, United States",
        "education": "University of California, Los Angeles",
        "connections": 450,
        "followers": 1100,
        "posts_per_week": 4      
    })
    res.status(201).json(result)
  } catch (error) {
    //next(error)
  }
});

// Update one
app.patch('/profiles/:id', async (req,res) => {
  try {
    const coll = await database.collection('profiles')
    const query = {_id: ObjectId.createFromHexString(req.params.id)}
    const updates = {$set: {first_name: "Maria", last_name: "Cabrero"}}
    const result = await coll.updateOne(query, updates)
    res.status(201).json(result)
  } catch (error) {
    //next(error)
  }
});

// Delete one 
app.delete('/profiles/:id', async (req,res) => {});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: {
      message: err.message || 'Internal Server Error'
    }
  });
});


app.listen(3000, () => {
  console.log('Server is running on port 3000');
});