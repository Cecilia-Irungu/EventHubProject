import React from 'react';

const Profile = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6 flex justify-center">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">My Profile</h1>
        <div className="flex flex-col gap-3">
          <div>
            <label className="block text-gray-700">Username</label>
            <input type="text" value="JohnDoe" className="w-full p-2 border rounded" readOnly />
          </div>
          <div>
            <label className="block text-gray-700">Email</label>
            <input type="email" value="johndoe@example.com" className="w-full p-2 border rounded" readOnly />
          </div>
          <button className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition mt-4">
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
