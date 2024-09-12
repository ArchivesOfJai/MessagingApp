import { useState } from "react";
import axios from "axios";
import "../css/register.css";
const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'Student' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', formData);
      console.log(response.data);
      alert('Registration successful');
      window.location.href = '/login';
    } catch (error) {
      console.error('Error registering user', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" type="text" placeholder="Name" value={formData.name} onChange={handleChange} required />
      <input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
      <input name="password" type="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
      <select name="role" value={formData.role} onChange={handleChange}>
        <option value="Student">Student</option>
        <option value="Teacher">Teacher</option>
        <option value="Institute">Institute</option>
      </select>
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
