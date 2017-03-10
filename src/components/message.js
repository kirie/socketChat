import React from 'react';

const message = (props) => {
  return (
    <div className="message">
      <span>{props.user} {props.text}</span>
    </div>
  );
};

export default message;
