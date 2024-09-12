import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Navbar from './components/Navbar';
import Messages from './pages/Messages';

function App() {
 const token = localStorage.getItem("token");

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={token? <Dashboard /> : <Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/messages/:userId" element={<Messages />} />
      </Routes>
    </Router>
  );
}

export default App;
