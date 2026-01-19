import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../redux/authSlice";
import API from "../api/api";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await API.post("/token", { username, password });
      dispatch(login({ user: { username }, token: res.data.access_token }));
      navigate("/events");
    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl mb-4 font-bold">Login</h2>
        <input className="border p-2 mb-2 w-full rounded" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
        <input type="password" className="border p-2 mb-2 w-full rounded" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
        <button className="bg-blue-500 text-white p-2 w-full rounded mt-2">Login</button>
      </form>
    </div>
  );
};

export default Login;
