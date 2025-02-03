const express = require('express');
const path = require('path'); // Import path module
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public'))); // Correct static path

// Database Connection
const mongoURI = 'mongodb://localhost:27017/yourDatabaseName'; // Replace with your URI
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Define your Mongoose schema and model (if you haven't already)
const userSchema = new mongoose.Schema({
    name: String,
    password: String,
});

const User = mongoose.model('User', userSchema);

// Routes
app.get('/', (req, res) => {
    res.render('login');
});

app.get('/signup', (req, res) => {
    res.render('signup');
});

app.post('/signup', async (req, res) => { // Correct post route here
    console.log("Signup route hit!"); // Check if the route is being hit
    try {
        console.log("Inside try block");
        const newUser = new User({
            name: req.body.username,
            password: req.body.password,
        });
        const savedUser = await newUser.save();
        console.log("User saved:", savedUser);
        res.redirect('/'); // Redirect after successful signup
    } catch (error) {
        console.error("Error saving user:", error);
        res.status(500).send("Error during signup"); // Send error response
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on Port: ${port}`);
});
