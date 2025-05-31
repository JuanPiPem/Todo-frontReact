// src/pages/Task.jsx
import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";

import {
  getTasks,
  createTask,
  deleteTask,
  updateTask,
} from "../services/taskService";
import { useNavigate } from "react-router-dom";

const Task = () => {
  const { theme, setTheme } = useTheme();
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

  const cardBg =
    theme === "light"
      ? "bg-white"
      : theme === "dark"
      ? "bg-gray-800"
      : "bg-cyan-200";
  const textColor = theme === "dark" ? "text-white" : "text-black";
  const inputBg =
    theme === "dark"
      ? "bg-gray-700 text-white border-gray-500"
      : "bg-white text-black border-gray-300";
  const buttonBg =
    theme === "dark"
      ? "bg-blue-500 hover:bg-blue-600"
      : "bg-blue-600 hover:bg-blue-700";

  return (
    <>
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="flex justify-center gap-4 mb-6">
          <button
            onClick={() => setTheme("light")}
            className="w-6 h-6 rounded-full bg-white border border-gray-300"
            title="Modo claro"
          ></button>
          <button
            onClick={() => setTheme("cyan")}
            className="w-6 h-6 rounded-full bg-cyan-200 border border-gray-300"
            title="Modo cian"
          ></button>
          <button
            onClick={() => setTheme("dark")}
            className="w-6 h-6 rounded-full bg-gray-800 border border-gray-500"
            title="Modo oscuro"
          ></button>
        </div>

        <div
          className={`max-w-xl mx-auto p-6 rounded-xl shadow-md ${cardBg} ${textColor}`}
        >
          <h2 className="text-2xl font-semibold mb-4 text-center">My Tasks</h2>
          <form onSubmit={handleCreate} className="flex gap-2 mb-6">
            <input
              type="text"
              placeholder="New task"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={`flex-grow p-2 border rounded ${inputBg}`}
            />
            <button
              type="submit"
              className={`${buttonBg} text-white px-4 py-2 rounded`}
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
                  <label className="inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => handleToggleCompleted(task)}
                      className={`w-4 h-4 rounded transition duration-200 ease-in-out
          ${
            theme === "dark"
              ? "accent-blue-400 border-gray-500 bg-gray-700"
              : "accent-blue-600 border-gray-300"
          }`}
                    />
                  </label>
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
                  className="text-red-500 hover:text-red-700 flex items-center gap-1"
                  title="Eliminar tarea"
                >
                  <FaTrash className="w-4 h-4 md:hidden" />

                  <span className="hidden md:inline">Delete</span>
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
