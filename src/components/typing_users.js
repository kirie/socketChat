import React from 'react';

const typingUsers = (props) => {
  function handleTyping(eachUserTyping, idx, arr) {
    if (arr.length === 1) {
      return (<div key={idx + eachUserTyping}>{eachUserTyping} is typing a message</div>);
    }
    return (<div key={idx + eachUserTyping}>{arr.length} people are typing</div>);
  }

  return (
    <div className="typingusers">
      {props.typing.map(handleTyping)}
    </div>
  );
};

export default typingUsers;
