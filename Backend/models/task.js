// models/task.js
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true, // Ensure that 'text' is required when creating a task
  },
  // You can add more fields to your Task schema if needed
  // For example, you might want to track task status, due date, etc.
  // status: {
  //   type: String,
  //   enum: ['todo', 'inProgress', 'completed'],
  //   default: 'todo',
  // },
  // dueDate: {
  //   type: Date,
  // },
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
