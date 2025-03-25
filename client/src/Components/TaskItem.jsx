import React, { useRef, useState } from 'react';
import { FaCheck, FaRegTrashAlt, FaEdit, FaSave, FaTimes } from "react-icons/fa";

export function TaskItem({ task, onToggleComplete, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const refTitle=useRef(task.title);
  const refDescription=useRef(task.description|| '');

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleSaveEdit = () => {
    
    onEdit({
      ...task,
      title: refTitle.current.value.trim(),
      description: refDescription.current.value.trim()
    });
    
    setIsEditing(false);
  };

  return (
    <React.Fragment>
    {
        isEditing?
        (<>
            <div className="flex flex-col bg-white p-4 rounded-lg shadow-sm">
            <input
              type="text"
              defaultValue={task.title}
              ref={refTitle}
              placeholder="Task title"
              className="w-full p-2 mb-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            
            <textarea
              defaultValue={task.description}
              ref={refDescription}
              placeholder="Task description (optional)"
              className="w-full p-2 mb-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="2"
            />
            
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={handleCancelEdit}
                className="p-1 px-2 text-gray-700 bg-gray-200 rounded hover:bg-gray-300 flex items-center gap-1"
              >
                <FaTimes size={14} /> Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveEdit}
                className="p-1 px-2 text-white bg-blue-600 rounded hover:bg-blue-700 flex items-center gap-1"
              >
                <FaSave size={14} /> Save
              </button>
            </div>
          </div></>
        ):(<>
            <div className="flex items-start gap-4 bg-white p-4 rounded-lg shadow-sm">
            <button
              onClick={() => onToggleComplete(task._id)}
              className={`flex-shrink-0 w-6 h-6 mt-1 rounded-full border-2 flex items-center justify-center
                ${task.completed 
                  ? 'bg-green-500 border-green-500' 
                  : 'border-gray-300 hover:border-green-500'
                }`}
            >
              {task.completed && <FaCheck size={14} className="text-white" />}
            </button>
            
            <div className="flex-grow">
              <h3 className={`font-medium ${task.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                {task.title}
              </h3>
              {task.description && (
                <p className={`mt-1 text-sm ${task.completed ? 'text-gray-400' : 'text-gray-600'}`}>
                  {task.description}
                </p>
              )}
            </div>
      
            <div className="flex gap-2">
              <button
                onClick={handleEdit}
                className="p-1 text-gray-500 hover:text-blue-600 transition-colors"
              >
                <FaEdit size={18} />
              </button>
              <button
                onClick={() => onDelete(task._id)}
                className="p-1 text-gray-500 hover:text-red-600 transition-colors"
              >
                <FaRegTrashAlt size={18} />
              </button>
            </div>
          </div></>
        )
    }
 </React.Fragment>
  );
}