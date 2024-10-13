




const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Replace with your MongoDB Atlas connection string
const MONGO_URI = 'mongodb+srv://nizarmasadeh2001:nizaR123@users.dbgaj.mongodb.net/?retryWrites=true&w=majority&appName=users';

const app = express();
const port = process.env.PORT || 3000; // Use environment variable for deployment

// Middleware to parse JSON bodies
app.use(bodyParser.json());

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected!'))
    .catch(err => console.error('MongoDB connection error:', err));

// Define a schema with username, email, and password
const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true }
});

// Create a model based on the schema
const User = mongoose.model('usersdb', userSchema);

// Define a POST API route to create new users
app.post('/api/users', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Validate request body
        if (!username || !email || !password) {
            return res.status(400).send({ message: 'Username, email, and password are required.' });
        }

        // Create a new user object
        const newUser = new User({
            username,
            email,
            password // In a real app, you should hash passwords before saving
        });

        // Save the new user to the database
        await newUser.save();

        res.status(201).send({ message: 'User created successfully!' });
    } catch (err) {
        console.error('Error creating user:', err);
        res.status(500).send({ message: 'Error creating user' });
    }
});

// Define a GET API route to fetch all users
app.get('/api/users', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users); // Send the fetched users data
    } catch (err) {
        console.error('Error fetching users:', err);
        res.status(500).send({ message: 'Error fetching users' });
    }
});

app.listen(port, () => console.log(`Server listening on port ${port}`));
























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

