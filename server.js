// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");

// const app = express();
// const PORT = process.env.PORT || 3001;

// app.use(cors());
// app.use(express.json());

// mongoose.connect('mongodb://localhost:27017/todo_list_db', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// })
// .then(() => console.log("MongoDB successfully connected"))
// .catch(err => console.error("MongoDB connection error: ", err));

// const taskSchema = new mongoose.Schema({
//   userName: String,
//   title: String,
//   description: String
// });

// const Task = mongoose.model('Task', taskSchema);

// app.post('/tasks', async (req, res) => {
//   try {
//     const task = new Task(req.body);
//     await task.save();
//     res.status(201).json(task);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// app.get('/tasks', async (req, res) => {
//   try {
//     const tasks = await Task.find();
//     res.status(200).json(tasks);
//   } catch (error) {
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// ____________________________________________________________________________________________________});


// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");

// const app = express();
// const PORT = process.env.PORT || 3001;

// app.use(cors());
// app.use(express.json());

// mongoose.connect('mongodb://localhost:27017/todo_list_db', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// })
// .then(() => console.log("MongoDB successfully connected"))
// .catch(err => console.error("MongoDB connection error: ", err));

// const taskSchema = new mongoose.Schema({
//   userName: String,
//   title: String,
//   description: String
// });

// const Task = mongoose.model('Task', taskSchema);

// app.post('/tasks', async (req, res) => {
//   try {
//     const task = new Task(req.body);
//     await task.save();
//     res.status(201).json(task);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: error.message });
//   }
// });

// app.get('/tasks', async (req, res) => {
//   try {
//     const tasks = await Task.find();
//     res.status(200).json(tasks);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// ___________________________________________________________________________});
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 3002;

app.use(cors());
app.use(express.json());
app.use(express.static('public')); // Serve static files

mongoose.connect('mongodb://localhost:27017/todo_list_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("MongoDB successfully connected"))
.catch(err => console.error("MongoDB connection error: ", err));

const taskSchema = new mongoose.Schema({
  userName: String,
  title: String,
  description: String
});

const Task = mongoose.model('Task', taskSchema);

app.post('/tasks', async (req, res) => {
  try {
    const task = new Task(req.body);
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/tasks', async (req, res) => {
  try {
    const { userName } = req.query;
    const tasks = userName ? await Task.find({ userName }) : await Task.find();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
