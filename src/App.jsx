// src/App.jsx
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Task from "./pages/Task";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { ThemeProvider } from "./context/ThemeContext";
import { useEffect } from "react";

// Layout wrapper para incluir header/footer solo cuando sea necesario
const Layout = ({ children }) => {
  const location = useLocation();
  const hideLayout =
    location.pathname === "/" || location.pathname === "/register";

  useEffect(() => {
    window.scrollTo(0, 0); // opcional: para que al cambiar de página, vaya al top
  }, [location]);

  return (
    <div className="min-h-screen flex flex-col">
      {!hideLayout && <Header />}
      <main className={`flex-1 `}>{children}</main>
      {!hideLayout && <Footer />}
    </div>
  );
};

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/tasks" element={<Task />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
