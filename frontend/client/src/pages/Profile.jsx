import { useEffect, useState } from "react";
import API from "../api/api";
import { useSelector } from "react-redux";

const Profile = () => {
  const token = useSelector(state => state.auth.token);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const res = await API.get("/users/me");
      setUser(res.data);
    };
    fetchProfile();
  }, [token]);

  if (!user) return <p>Loading...</p>;

  return (
    <div className="p-8 max-w-md mx-auto bg-white shadow-md rounded">
      <h1 className="text-3xl font-bold mb-4">Profile</h1>
      <p><strong>Username:</strong> {user.username}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Created At:</strong> {new Date(user.created_at).toLocaleString()}</p>
    </div>
  );
};

export default Profile;
