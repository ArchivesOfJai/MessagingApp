import { useState, } from "react";
import axios from "axios";

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', formData);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('name', response.data.user.name);
      alert('Login successful');
      window.location.href = '/';
    } catch (error) {
      console.error('Error logging in', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
      <input name="password" type="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
