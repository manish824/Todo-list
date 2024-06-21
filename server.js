const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const multer = require('multer');
const crypto = require('crypto');
const path = require('path');
const { GridFsStorage } = require('multer-gridfs-storage');

const app = express();
const PORT = process.env.PORT || 3002;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/todo_list_db', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB successfully connected"))
.catch(err => console.error("MongoDB connection error: ", err));

// Create a storage object with a given configuration
const storage = new GridFsStorage({
    url: 'mongodb://localhost:27017/todo_list_db',
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buf) => {
                if (err) {
                    return reject(err);
                }
                const filename = buf.toString('hex') + path.extname(file.originalname);
                const fileInfo = {
                    filename: filename,
                    bucketName: 'uploads'
                };
                resolve(fileInfo);
            });
        });
    }
});

const upload = multer({ storage });
const User = require('./models/User');  // Assuming this is the correct path to your User model
const Task = require('./models/Task');  // Assuming this is the correct path to your Task model

app.post('/register', upload.single('image'), async (req, res) => {
    const { username, password, name } = req.body;
    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(409).json({ error: "Username already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
            name,
            username,
            password: hashedPassword,
            imageFile: req.file.filename
        });

        await user.save();
        res.status(201).json({ message: 'User registered successfully', userId: user._id });
    } catch (error) {
        res.status(500).json({ error: "Server error during registration" });
    }
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid credentials" });
        }

        res.json({ message: "Login successful", user: {
            id: user._id,
            name: user.name,
            username: user.username,
            imageFile: user.imageFile ? `http://127.0.0.1:3002/images/${user.imageFile}` : null
        }});
    } catch (error) {
        res.status(500).json({ error: "Server error during login" });
    }
});

app.get('/images/:filename', (req, res) => {
    const bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, { bucketName: 'uploads' });
    const downloadStream = bucket.openDownloadStreamByName(req.params.filename);
    downloadStream.on('data', (chunk) => res.write(chunk));
    downloadStream.on('error', () => res.sendStatus(404));
    downloadStream.on('end', () => res.end());
});

app.get('/Users/:username', async (req, res) => {
    console.log(req.query)
    const { username } = req.query;
    try {
        const tasks = await User.find({ username });
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});
// Task routes
app.post('/tasks', async (req, res) => {
    const { userName, title, description } = req.body;
    try {
        const newTask = new Task({ userName, title, description });
        await newTask.save();
        res.status(201).json(newTask);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/tasks', async (req, res) => {
    const { userName } = req.query;
    try {
        const tasks = await Task.find({ userName });
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.delete('/tasks', async (req, res) => {
    const { userName } = req.query;
    try {
        const result = await Task.deleteMany({ userName });
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.put('/tasks/update', async (req, res) => {
    const { userName, title, description } = req.body;
    try {
        const updatedTask = await Task.findOneAndUpdate({ userName, title }, { description }, { new: true });
        if (!updatedTask) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.json(updatedTask);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
