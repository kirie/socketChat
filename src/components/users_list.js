import React, { PropTypes } from 'react';

const usersList = (props) => {  
  function renderUsers(usersArr) {
    let userList;
    if (usersArr.length > 10) {
      userList = usersArr.slice(0, 8).sort().map((v, i) => {
        return (
          <span key={i + v}>
            <i className="fa fa-circle" aria-hidden="true" />{v}, 
          </span>
        );
      });
      return (
        <div>Active Users Online: 
          <div>{userList} and {usersArr.length - 8} others</div>
        </div>
      );
    }
    else {
      userList = usersArr.map((v, i, a) => {
        if (i === a.length - 1) {
          return (
            <span key={i + v}>
              <i className="fa fa-circle" aria-hidden="true" />{v}
            </span>
          );
        }
        return (
          <span key={v + i}><i className="fa fa-circle" aria-hidden="true" />{v}</span>
        );
      });
      return (
        <div>Active Users Online:
          <div>{userList}</div>
        </div>
      );
    }
  }

  return (
    <div className="users">
      {renderUsers(props.users)}
    </div>
  );
};

usersList.propTypes = {
  users: PropTypes.array
};

export default usersList;
