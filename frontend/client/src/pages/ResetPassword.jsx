import { useState } from "react";
import API from "../api/api";

const ResetPassword = () => {
  const [email, setEmail] = useState("");

  const handleReset = async e => {
    e.preventDefault();
    // For MVP, we just simulate reset
    alert(`Password reset link sent to ${email} (simulation)`);
    setEmail("");
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form onSubmit={handleReset} className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl mb-4 font-bold">Reset Password</h2>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="border p-2 mb-2 w-full rounded"
        />
        <button className="bg-yellow-500 text-white p-2 w-full rounded mt-2">Reset</button>
      </form>
    </div>
  );
};

export default ResetPassword;
