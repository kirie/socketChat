import React, { PropTypes, Component } from 'react';
import Message from './message';

class messageList extends Component {

  componentDidUpdate() {
    const findID = `messageList${this.props.user}`;
    const scrollDiv = document.getElementById(findID);
    scrollDiv.scrollTop = scrollDiv.scrollHeight;
  }

  renderMessages(eachMessage, idx) {
    return (
      <Message
        key={idx}
        user={eachMessage.user}
        text={eachMessage.text}
      />
    );
  }

  render() {
    const idName = `messageList${this.props.user}`;
    return (
      <div className="messageList" id={idName}>
        { this.props.messages.map(this.renderMessages) }
      </div>
    );
  }
}

messageList.propTypes = {
  user: PropTypes.string.isRequired,
  messages: PropTypes.array.isRequired
};

export default messageList;
