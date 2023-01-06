import React from 'react';
// NOT USED
const LoggedUserData = ({ username, email, role, plan }) => (
  <div className="logged-user-data">
    <div>Username: {username}</div>
    <div>Email: {email}</div>
    <div>Role: {role}</div>
    <div>Plan: {plan}</div>
  </div>
);

export default LoggedUserData;