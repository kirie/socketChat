import React from 'react';
import Message from './message';

const messageList = (props) => {

  function renderMessages(eachMessage, idx) {
    return (
      <Message
        key={idx}
        user={eachMessage.user}
        text={eachMessage.text}
      />
    );
  }

  return (
    <div className='displayList'>
      <h2> Conversation: </h2>
      { props.messages.map(renderMessages) }
    </div>
  );
};

export default messageList;

function optionsList(eachOne){
  console.log(eachOne);
}

{equipment.map(optionsList)}