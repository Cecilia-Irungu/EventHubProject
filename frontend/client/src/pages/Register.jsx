import { useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await API.post("/users", { username, email, password });
      alert("Registered successfully!");
      navigate("/login");
    } catch (err) {
      alert("Registration failed");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl mb-4 font-bold">Register</h2>
        <input className="border p-2 mb-2 w-full rounded" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
        <input className="border p-2 mb-2 w-full rounded" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <input type="password" className="border p-2 mb-2 w-full rounded" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
        <button className="bg-green-500 text-white p-2 w-full rounded mt-2">Register</button>
      </form>
    </div>
  );
};

export default Register;
