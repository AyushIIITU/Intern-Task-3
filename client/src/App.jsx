import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { FaClipboardList } from "react-icons/fa";
import { TaskForm } from './Components/TaskForm.jsx';
import { TaskItem } from './Components/TaskItem.jsx';
import { taskApi } from './api/tasks';

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const tasks = await taskApi.getTasks();
      setTasks(tasks);
    } catch (error) {
      if(error?.response?.status === 404) {
        setTasks([]);
        toast('No tasks found');
      } else {
      toast.error('Failed to load tasks');}
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTask = async (newTask) => {
    try {
      const task = await taskApi.createTask(newTask);
      setTasks(prev => [...prev, task]);
      toast.success('Task created successfully');
    } catch (error) {
      toast.error('Failed to create task');
    }
  };

  const handleToggleComplete = async (id) => {
    try {
      const task = tasks.find(t => t._id === id);
      if (!task) return;

      const updates = { completed: !task.completed };
      const updatedTask = await taskApi.updateTask(id, updates);
      console.log(updatedTask, updates);
      setTasks(prev => prev.map(t => t._id === id ? updatedTask : t));
      toast.success('Task updated successfully');
    } catch (error) {
      if(error.response.status === 404) {
        toast.error('Task not found');
      } else {
      toast.error('Failed to update task');}
    }
  };

  const handleEditTask = async (updatedTask) => {
    try {
      const updates = {
        title: updatedTask.title,
        description: updatedTask.description,
      };
      const result = await taskApi.updateTask(updatedTask._id, updates);
      setTasks(prev => prev.map(t => t._id === updatedTask._id ? result : t));
      toast.success('Task updated successfully');
    } catch (error) {
      if(error.response.status === 404) {
        return toast.error('Task not found');
      }
      toast.error('Failed to update task');
    }
  };


  const handleDeleteTask = async (id) => {
    try {
      await taskApi.deleteTask(id);
      setTasks(prev => prev.filter(t => t._id !== id)); // Fix: changed t.id to t._id
      toast.success('Task deleted successfully');
    } catch (error) {
      if(error.response.status === 404) {
        return toast.error('Task not found');
      }
      toast.error('Failed to delete task');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      
      <div className="max-w-3xl mx-auto py-12 px-4">
        <div className="flex items-center gap-3 mb-8">
          <FaClipboardList className="w-8 h-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-900">Task Manager</h1>
        </div>

        <TaskForm onSubmit={handleCreateTask} />

        <div className="mt-8 space-y-4">
          {loading ? (
            <div className="text-center text-gray-500">Loading tasks...</div>
          ) : tasks.length === 0 ? (
            <div className="text-center text-gray-500">No tasks yet. Create one above!</div>
          ) : (
            tasks.map(task => (
              <TaskItem
                key={task._id}
                task={task}
                onToggleComplete={handleToggleComplete}
                onDelete={handleDeleteTask}
                onEdit={handleEditTask}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default App;