const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const TodoModel = require('./Schema/Todo')
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://kumarvinay96419:GetUpAgain@cluster0.devilf9.mongodb.net/GetUpAgain?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

app.get('/get', (req, res)=>{
  TodoModel.find()
  .then(result => res.json(result))
  .catch(err => res.json(err))
})

app.put('/update/:id', (req, res) => {
  const { id } = req.params;
  TodoModel.findByIdAndUpdate(id, { done: true }, { new: true }) // Add the 'new' option
    .then(result => res.json(result))
    .catch(err => res.json(err));
});

app.put('/delete/:id', (req, res) => {
  const { id } = req.params;
  TodoModel.findByIdAndDelete(id) // Add the 'new' option
    .then(result => res.json(result))
    .catch(err => res.json(err));
});

app.post('/add', (req, res) => {
    const task = req.body.task;
    TodoModel.create({
        task: task
    }).then(result => res.json(result))
    .catch( err => console.log(err))
})
app.listen(3001, ()=>{
    console.log('Server Listening')
})