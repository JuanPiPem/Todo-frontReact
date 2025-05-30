// src/pages/Task.jsx
import { useEffect, useState } from "react";
import { getTasks, createTask, deleteTask } from "../services/taskService";
import { useNavigate } from "react-router-dom";

const Task = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await getTasks();
        setTasks(data);
      } catch (error) {
        alert("Unauthorized. Please log in.");
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
    <div>
      <h2>My Tasks</h2>
      <form onSubmit={handleCreate}>
        <input
          type="text"
          placeholder="New task"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>

      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            {task.title}{" "}
            <button onClick={() => handleDelete(task._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Task;
