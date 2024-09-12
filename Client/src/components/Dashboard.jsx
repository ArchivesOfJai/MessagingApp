import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../css/dashboard.css";

const Dashboard = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const token = localStorage.getItem("token");
    try {
      if(token){
        const response = await axios.get("http://localhost:5000/api/users", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUsers(response.data.users);
        console.log(response.data.users);
      }   
    } catch (error) {
      console.error("Error fetching users", error);
    }
  };

  return (
    <div className="pt-4" >
      <h2>Chat with Users</h2>
      <div className="user-cards p-5">
        {users.length === 0 ? (
          <p>No users found</p>
        ) : (
          users.map((user) => (
            <div key={user.id} className="user-card ">
              <h3>{user.name}</h3>
              <p>{user.email}</p>
              <p>{user.role}</p>
              <Link to={`/messages/${user.id}`}>
                <button>Chat with {user.name}</button>
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Dashboard;
