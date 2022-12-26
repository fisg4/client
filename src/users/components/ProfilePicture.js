import React from 'react';

const ProfilePicture = ({ profilePictureUrl }) => (
  <div className="profile-picture">
    <img src={profilePictureUrl} alt="Profile" />
  </div>
);

export default ProfilePicture;