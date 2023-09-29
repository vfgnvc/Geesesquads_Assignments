import React, { useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchTasks, addTask, editTask, deleteTask } from './taskService';
function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editTaskState, setEditTaskState] = useState({ id: null, text: '' });

  useEffect(() => {
    
    fetchTasks()
      .then((data) => {
        setTasks(data);
      })
      .catch((error) => {
        console.error('Error fetching tasks:', error);
      });
  }, []);

  const addTaskHandler = async () => {
    if (!newTask) {
      toast.error('Task text is required');
      return;
    }

    try {
      const addedTask = await addTask({ text: newTask });
      setTasks([...tasks, addedTask]);
      setNewTask('');
      toast.success('Task added successfully');
    } catch (error) {
      console.error('Error adding task:', error);
      toast.error('Error adding task');
    }
  };

  const editTaskHandler = async () => {
    if (!editTaskState.text) {
      toast.error('Task text is required');
      return;
    }

    try {
      const editedTask = await editTask(editTaskState.id, {
        text: editTaskState.text,
      });
      const updatedTasks = tasks.map((task) =>
        task._id === editedTask._id ? editedTask : task
      );
      setTasks(updatedTasks);
      setEditTaskState({ id: null, text: '' });
      toast.success('Task edited successfully');
    } catch (error) {
      console.error('Error editing task:', error);
      toast.error('Error editing task');
    }
  };

  const deleteTaskHandler = async (taskId) => {
    try {
      await deleteTask(taskId);
      const updatedTasks = tasks.filter((task) => task._id !== taskId);
      setTasks(updatedTasks);
      toast.success('Task deleted successfully');
    } catch (error) {
      console.error('Error deleting task:', error);
      toast.error('Error deleting task');
    }
  };

  return (
    <div className="App">
      <h1 className="mt-4">Task Manager</h1>

      <div className="mt-4">
        <h2>Add Task</h2>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Task text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <div className="input-group-append">
            <button className="btn btn-primary" onClick={addTaskHandler}>
              Add
            </button>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <h2>Task List</h2>
        <ul className="list-group">
          {tasks.map((task) => (
            <li className="list-group-item" key={task._id}>
              {task._id === editTaskState.id ? (
                <div>
                  <input
                    type="text"
                    className="form-control"
                    value={editTaskState.text}
                    onChange={(e) =>
                      setEditTaskState({ ...editTaskState, text: e.target.value })
                    }
                  />
                  <button
                    className="btn btn-success mt-2"
                    onClick={editTaskHandler}
                  >
                    Save
                  </button>
                </div>
              ) : (
                <div>
                  {task.text}
                  <button
                    className="btn btn-info ml-2"
                    onClick={() => setEditTaskState({ id: task._id, text: task.text })}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger ml-2"
                    onClick={() => deleteTaskHandler(task._id)}
                  >
                    Delete
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Toast notifications */}
      <ToastContainer position="bottom-right" autoClose={3000} />
    </div>
  );
}



export default App;
