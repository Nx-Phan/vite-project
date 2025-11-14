import React from "react";
import "./ProfilePage.css"; // optional for styling

const ProfilePage: React.FC = () => {
  // Example user data
  const username = "Nevon Xaya";
  const email = "nevon@example.com";

  return (
    <div className="profile-container">
      <div className="profile-card">
        <img
          src="/default-profile.png" // put a default profile image in /public
          alt="Profile"
          className="profile-picture"
        />
        <h2>{username}</h2>
        <p>{email}</p>
        <button className="edit-button">Edit Profile</button>
      </div>
    </div>
  );
};

export default ProfilePage;
