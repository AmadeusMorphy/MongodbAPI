




const mongoose = require('mongoose');

// MongoDB connection string
const MONGO_URI = process.env.MONGODB_URI || 'mongodb+srv://nizarmasadeh2001:nizaR123@users.dbgaj.mongodb.net/?retryWrites=true&w=majority&appName=users';

// Connect to MongoDB Atlas
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('MongoDB connected!');
    })
    .catch(err => {
        console.error('MongoDB connection error:', err);
    });

// Define a simple schema for your data
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
});

// Create a model based on the schema
const User = mongoose.model('usersdb', userSchema);

// The handler function for Vercel
module.exports = async (req, res) => {
    if (req.method === 'GET') {
        try {
            const users = await User.find();
            res.status(200).json(users); // Send the fetched users data
        } catch (err) {
            console.error('Error fetching users:', err);
            res.status(500).send({ message: 'Error fetching users' });
        }
    } else if (req.method === 'POST') {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).send({ message: 'All fields are required' });
        }

        const user = new User({ name, email, password });
        try {
            await user.save();
            res.status(201).send({ message: 'User created successfully' });
        } catch (err) {
            console.error('Error creating user:', err);
            res.status(500).send({ message: 'Error creating user' });
        }
    } else {
        res.status(405).send({ message: 'Method Not Allowed' });
    }
};

























// const express = require('express');
// const mongoose = require('mongoose');

// // Replace with your MongoDB Atlas connection string
// const MONGO_URI = 'mongodb+srv://nizarmasadeh2001:nizaR123@users.dbgaj.mongodb.net/?retryWrites=true&w=majority&appName=users';

// const app = express();
// const port = process.env.PORT || 3000; // Use environment variable for deployment

// mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => console.log('MongoDB connected!'))
//     .catch(err => console.error('MongoDB connection error:', err));

// // Define a simple schema for your data
// const userSchema = new mongoose.Schema({
//     name: String,
//     email: String
// });

// // Create a model based on the schema
// const User = mongoose.model('usersdb', userSchema);

// // Define a GET API route to fetch all users
// app.get('/api/users', async (req, res) => {
//     try {
//         const users = await User.find();
//         res.json(users); // Send the fetched users data
//     } catch (err) {
//         console.error('Error fetching users:', err);
//         res.status(500).send({ message: 'Error fetching users' });
//     }
// });

// app.listen(port, () => console.log(`Server listening on port ${port}`));

