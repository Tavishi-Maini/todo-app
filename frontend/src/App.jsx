import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>
      {/* Protected Dashboard */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      {/* Auth Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      {/* Catch-all 404 */}
      <Route
        path="*"
        element={
          <div style={{ textAlign: "center", marginTop: "2rem" }}>
            <h2>Page Not Found</h2>
          </div>
        }
      />
    </Routes>
  );
}

export default App;
