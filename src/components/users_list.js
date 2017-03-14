import React from 'react';

const usersList = (props) => {
  function renderUsers(eachUser, idx) {
    return (
      <li key={idx}>
        {eachUser}
      </li>
    );
  }

  return (
    <div className="users">
      <h4>Online</h4>
      <ul>
        {props.users.map(renderUsers)}
      </ul>
    </div>
  );
};

export default usersList;
