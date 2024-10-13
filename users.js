




// const mongoose = require('mongoose');

// // MongoDB connection string
// const MONGO_URI = process.env.MONGODB_URI || 'mongodb+srv://nizarmasadeh2001:nizaR123@users.dbgaj.mongodb.net/?retryWrites=true&w=majority&appName=users';

// // Connect to MongoDB Atlas
// mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => {
//         console.log('MongoDB connected!');
//     })
//     .catch(err => {
//         console.error('MongoDB connection error:', err);
//     });

// // Define a simple schema for your data
// const userSchema = new mongoose.Schema({
//     name: String,
//     email: String,
//     password: String
// });

// // Create a model based on the schema
// const User = mongoose.model('usersdb', userSchema);

// // The handler function for Vercel
// module.exports = async (req, res) => {
//     if (req.method === 'GET') {
//         try {
//             const users = await User.find();
//             res.status(200).json(users); // Send the fetched users data
//         } catch (err) {
//             console.error('Error fetching users:', err);
//             res.status(500).send({ message: 'Error fetching users' });
//         }
//     } else if (req.method === 'POST') {
//         const { name, email, password } = req.body;
//         if (!name || !email || !password) {
//             return res.status(400).send({ message: 'All fields are required' });
//         }

//         const user = new User({ name, email, password });
//         try {
//             await user.save();
//             res.status(201).send({ message: 'User created successfully' });
//         } catch (err) {
//             console.error('Error creating user:', err);
//             res.status(500).send({ message: 'Error creating user' });
//         }
//     } else {
//         res.status(405).send({ message: 'Method Not Allowed' });
//     }
// };























const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Enable CORS if you're making requests from another origin

require('dotenv').config(); // Load environment variables
const app = express(); // Initialize the Express app
const port = process.env.PORT || 8070; // Use environment variable for deployment

// Enable JSON body parsing
app.use(express.json());
app.use(cors()); // Move this after initializing the app

// Replace with your MongoDB Atlas connection string
const MONGODB_CONNECT_URI = process.env.MONGODB_CONNECT_URI;

mongoose.connect(MONGODB_CONNECT_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected!'))
    .catch(err => console.error('MongoDB connection error:', err));

// Define a simple schema for your data
const userSchema = new mongoose.Schema({
    name: { type: String, required: true }, // Set as required
    email: { type: String, required: true } // Set as required
});

// Handle 404 for unmatched routes
app.use((req, res) => {
    res.status(404).send({ message: 'Not Found' });
  });
  
  app.get('/', (req, res) => {
    res.send('API is working!');
});

// Create a model based on the schema
const User = mongoose.model('usersdb', userSchema); // Use a singular model name

// Define a POST API route to create a user
app.post('/users', async (req, res) => {
    const { name, email } = req.body; // Updated destructuring to match the schema
    const user = new User({ name, email }); // Create a new user with the correct field names
    try {
        await user.save();
        res.status(201).json(user); // Send the created user data
    } catch (err) {
        console.error('Error saving user:', err);
        res.status(500).send({ message: 'Error saving user' });
    }
});

// Define a GET API route to fetch all users
app.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users); // Send the fetched users data
    } catch (err) {
        console.error('Error fetching users:', err);
        res.status(500).send({ message: 'Error fetching users' });
    }
});

app.listen(port, () => console.log(`Server listening on port ${port}`));
