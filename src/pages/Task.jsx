// src/pages/Task.jsx
import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";

import {
  getTasks,
  createTask,
  deleteTask,
  updateTask,
} from "../services/taskService";
import { useNavigate } from "react-router-dom";

const Task = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const navigate = useNavigate();

  const handleToggleCompleted = async (task) => {
    try {
      const updatedTask = await updateTask(task._id, {
        completed: !task.completed,
      });
      setTasks(tasks.map((t) => (t._id === task._id ? updatedTask : t)));
    } catch (error) {
      alert("Error updating task");
    }
  };

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await getTasks();
        setTasks(data);
      } catch (error) {
        navigate("/");
      }
    };

    fetchTasks();
  }, [navigate]);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      const newTask = await createTask({ title });
      setTasks([newTask, ...tasks]);
      setTitle("");
    } catch (error) {
      alert("Error creating task");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      setTasks(tasks.filter((task) => task._id !== id));
    } catch (error) {
      alert("Error deleting task");
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="max-w-xl mx-auto bg-cyan-200 p-6 rounded-xl shadow-md mt-40">
          <h2 className="text-2xl font-semibold mb-4 text-center">My Tasks</h2>
          <form onSubmit={handleCreate} className="flex gap-2 mb-6">
            <input
              type="text"
              placeholder="New task"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="flex-grow p-2 border border-gray-300 rounded"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Add
            </button>
          </form>
          <ul>
            {tasks.map((task) => (
              <li
                key={task._id}
                className="flex justify-between items-center border-b py-2"
              >
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => handleToggleCompleted(task)}
                  />
                  <span
                    className={`text-lg ${
                      task.completed
                        ? "line-through text-gray-500 opacity-60"
                        : ""
                    }`}
                  >
                    {task.title}
                  </span>
                </div>
                <button
                  onClick={() => handleDelete(task._id)}
                  className="text-red-500 hover:text-red-700 text-sm flex items-center"
                  title="Delete task"
                >
                  {/* Ícono visible solo en mobile */}
                  <FaTrash className="text-base block sm:hidden" />

                  {/* Texto visible solo en pantallas medianas en adelante */}
                  <span className="hidden sm:inline text-base font-medium">
                    Delete
                  </span>
                </button>
              </li>
            ))}
            {tasks.length === 0 && (
              <li className="text-gray-500 text-center">No tasks yet.</li>
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Task;
