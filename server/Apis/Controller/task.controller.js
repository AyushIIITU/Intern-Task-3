
import Task from '../Model/task.model.js';
const TasksController = {
    getAllTask: async (req, res) => {
        try {
            const tasks = await Task.find();
            if(!tasks|| tasks.length === 0) {
                return res.status(404).json({ message: 'No tasks found' });
            }
            res.status(200).json(tasks);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    createTask: async (req, res) => {
        try {
            const {title, description, completed} = req.body;
            if(!title) {
                return res.status(400).json({ message: 'Title is required' });
            }
            const task = new Task({
                title,
                description,
                completed: completed || false,
            });
            const result = await task.save();
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    updateTaskById: async (req, res) => {
        try {
            const { id } = req.params;
            
            const result = await Task.findById(id);
            if(!result) {
                return res.status(404).json({ message: 'Task not found' });
            }
            const { title, description, completed } = req.body; 
            result.title = title || result.title;
            result.description = description || result.description;
            result.completed = completed === undefined ? result.completed : completed;
            await result.save();
            res.status(200).json(result);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: error.message });
        }
    },
    deleteTaskById: async (req, res) => {
        try {
            const { id } = req.params;
            const result = await Task.findByIdAndDelete(id);
            if(!result) {
                return res.status(404).json({ message: 'Task not found' });
            }
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
};
export default TasksController;