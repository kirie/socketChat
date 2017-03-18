import React, { PropTypes } from 'react';

const typingUsers = (props) => {
  function typing(arr) {
    if (arr.length === 1) {
      return (<div>{arr[0]} is typing a message.</div>);
    }
    else if (arr.length > 1) {
      return (<div>{arr.length} people are currently typing.</div>);
    }
    return null;
  }
  return (
    <div className="typingusers">
      {typing(props.typing)}
    </div>
  );
};

typingUsers.propTypes = {
  typing: PropTypes.array
};

export default typingUsers;
