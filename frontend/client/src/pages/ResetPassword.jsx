import React from 'react';

const ResetPassword = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Reset Password</h1>
        <form className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
            Send Reset Link
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
