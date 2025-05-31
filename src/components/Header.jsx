// src/components/Header.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const Header = () => {
  const { theme } = useTheme();
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  const bgClass =
    theme === "light"
      ? "bg-white"
      : theme === "dark"
      ? "bg-gray-800"
      : "bg-cyan-200";

  const textColor = theme === "dark" ? "text-white" : "text-black";

  return (
    <header
      className={`sticky top-0 z-50 p-4 shadow-md flex justify-between items-center ${bgClass} ${textColor}`}
    >
      <h1
        className="text-xl font-semibold cursor-pointer"
        onClick={() => navigate("/tasks")}
      >
        TaskApp
      </h1>
      <div className="flex items-center gap-4">
        {user && (
          <>
            <div className="flex items-center gap-2">
              <User className="w-5 h-5" />
              <span>{user.name}</span>
            </div>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
