// src/components/Header.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "lucide-react"; // o cualquier otro ícono si usás Lucide, Heroicons, etc.

const Header = () => {
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

  return (
    <header className="sticky top-0 z-50 bg-white p-4 shadow-md flex justify-between items-center">
      <h1
        className="text-xl font-semibold cursor-pointer"
        onClick={() => navigate("/tasks")}
      >
        TaskApp
      </h1>
      <div className="flex items-center gap-4">
        {user && (
          <>
            <div className="flex items-center gap-2 text-gray-700">
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
