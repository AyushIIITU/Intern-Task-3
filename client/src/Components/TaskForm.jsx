import React, { useState, useEffect } from 'react';

import { FaPlus } from "react-icons/fa";

export function TaskForm({ onSubmit, editingTask, onUpdate, onCancel }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  // Reset form when editingTask changes
  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title || '');
      setDescription(editingTask.description || '');
    } else {
      setTitle('');
      setDescription('');
    }
  }, [editingTask]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!title.trim()) return;

    if (editingTask) {
      onUpdate({
        ...editingTask,
        title: title.trim(),
        description: description.trim()
      });
    } else {
      onSubmit({
        title: title.trim(),
        description: description.trim()
      });
    }

    // Only clear form when adding new task (not when editing)
    if (!editingTask) {
      setTitle('');
      setDescription('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-6">
      <div className="mb-4">
        <h2 className="text-lg font-medium mb-3">
          {editingTask ? 'Edit Task' : 'Create a new task'}
        </h2>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task title"
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      
      <div className="mb-4">
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Task description (optional)"
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows="3"
        />
      </div>
      
      <div className="flex justify-end gap-2">
        {editingTask && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
        >
          {editingTask ? 'Update Task' : 'Add Task'}
        </button>
      </div>
    </form>
  );
}