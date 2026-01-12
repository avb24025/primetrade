import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/nav";
import Login from "./components/login";
import Register from "./components/register";
import Hero from "./components/hero";
import Create from "./components/create";
import Home from "./components/home";
import ProtectedRoute from "./components/protectRoute";
import Manage from "./components/manage";
import { AuthProvider } from "./context/authContext";

function App() {
  return (
    <AuthProvider>
      <Router>
        {/* Navbar will be visible on all pages */}
        <Navbar />
        <Routes>
          {/* Define your routes here */}
          <Route path="/" element={<Hero />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/create" element={<ProtectedRoute><Create /></ProtectedRoute>} />
          <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/manage" element={<ProtectedRoute allowedRoles={'admin'}><Manage /></ProtectedRoute>} />

          {/* Add more routes as needed */}
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
