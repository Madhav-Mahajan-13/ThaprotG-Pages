/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";

export default function UserCard({ user,handleUserChange }) {
  return (
    <div className="w-full max-w-sm mx-auto bg-white rounded-xl shadow-md overflow-hidden border">
      {/* Profile Picture & Header */}
      <div className="flex flex-col items-center p-5 bg-gray-100">
        <img
          src={
            user.profile_picture
              ? user.profile_picture
              : "https://via.placeholder.com/150"
          }
          alt="Profile"
          className="w-24 h-24 rounded-full object-cover border"
        />
        <h2 className="text-xl font-semibold mt-3">
          {user.first_name} {user.last_name}
        </h2>
        <p className="text-gray-500">@{user.username}</p>
        <span
          className={`mt-2 px-3 py-1 text-sm rounded-full ${
            user.suspended ? "bg-red-500 text-white" : "bg-green-500 text-white"
          }`}
        >
          {user.suspended ? "Suspended" : "Active"}
        </span>
      </div>

      {/* User Info */}
      <div className="p-5 space-y-2 text-gray-700">
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        {user.personal_email && (
          <p>
            <strong>Personal Email:</strong> {user.personal_email}
          </p>
        )}
        <p>
          <strong>Phone:</strong> {user.phone_number || "N/A"}
        </p>
        {user.additional_phone_number && (
          <p>
            <strong>Alt Phone:</strong> {user.additional_phone_number}
          </p>
        )}
        <p>
          <strong>Graduation Year:</strong> {user.graduation_year || "N/A"}
        </p>
        <p>
          <strong>Degree:</strong> {user.degree || "N/A"}
        </p>
        <p>
          <strong>User Type:</strong> {user.user_type}
        </p>
        {user.bio && (
          <p>
            <strong>Bio:</strong> {user.bio}
          </p>
        )}
      </div>

      {/* Footer Links */}
      <div className="flex justify-between p-4 bg-gray-100">
        {user.linkedin_url && (
          <a
            href={user.linkedin_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            LinkedIn
          </a>
        )}
        <p className="text-gray-500 text-sm">
          OTP Verified: {user.otp_verified ? "✅" : "❌"}
        </p>
      </div>
      <div className="flex items-center justify-center border-t-2 border-black">
        <button className={"px-1 py-2 cursor-pointer " + "bg-" + (user.suspended ? "green-" : "red-") + '500 w-full' } onClick={(e) => handleUserChange(user.id2,user.suspended)}>{user.suspended ? "Activate" : "Suspend"}</button>
      </div>
    </div>
  );
}
