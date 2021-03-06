import React, { PropTypes, Component } from 'react';
import Message from './message';

class messageList extends Component {
  constructor(props) {
    super(props);
    this.renderMessages = this.renderMessages.bind(this);
  }

  componentDidUpdate() {
    const findID = `messageList${this.props.user}`;
    const scrollDiv = document.getElementById(findID);
    scrollDiv.scrollTop = scrollDiv.scrollHeight;
  }

  renderMessages(eachMessage, idx) {
    return (
      <Message
        key={idx}
        mine={eachMessage.mine}
        servermsg={eachMessage.servermsg}
        time={eachMessage.time}
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
