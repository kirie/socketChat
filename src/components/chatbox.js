import React, { Component } from 'react';
import io from 'socket.io-client';
import InlineEdit from 'react-edit-inline';
import UsersList from './users_list';
import MessageList from './message_list';
import InputForm from './input_form';

class chatBox extends Component {

  constructor(props) {
    super(props);

    this.state = {
      users: [],
      messages: [],
      typingusers: [],
      text: '',
      user: '',
      typing: false,
      timeout: null
    };

    this.initialSetup = this.initialSetup.bind(this);
    this.incoming = this.incoming.bind(this);
    this.userJoined = this.userJoined.bind(this);
    this.userLeft = this.userLeft.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.typingNotify = this.typingNotify.bind(this);
    this.handleTyping = this.handleTyping.bind(this);
    this.dataChanged = this.dataChanged.bind(this);
    this.changedName = this.changedName.bind(this);
  }

  componentDidMount() {
    this.socket = io('http://localhost:3000');
    this.socket.on('initialSetup', this.initialSetup);
    this.socket.on('incoming', this.incoming);
    this.socket.on('userJoin', this.userJoined);
    this.socket.on('userLeft', this.userLeft);
    this.socket.on('typingNotify', this.typingNotify);
    this.socket.on('changedName', this.changedName);
  }

  initialSetup(data) {
    this.setState({ users: data.users, user: data.name });
  }

  // On recieved name change update
  changedName(data) {
    const { users } = this.state;
    const index = users.indexOf(data.formerName);
    users.splice(index, 1);
    users.push(data.name);
    const temp = {
      user: 'Notification',
      text: `${data.formerName} changed their name to ${data.name}`
    };
    this.setState({
      users,
      messages: [...this.state.users, temp]
    });
  }

  // Incoming messages
  incoming(msg) {
    this.setState({ messages: [...this.state.messages, msg] });
  }

  userJoined(data) {
    const notifyJoin = {
      user: 'Notification ',
      text: ` ${data.name} has joined the chat`
    };
    this.setState({
      users: [...this.state.users, data.name],
      messages: [...this.state.messages, notifyJoin]
    });
  }

  userLeft(data) {
    const { users } = this.state;
    const index = users.indexOf(data.name);
    users.splice(index, 1);
    const notifyLeave = {
      user: 'Notification ',
      text: ` ${data.name} has left the chat`
    };
    this.setState({
      users: [users],
      messages: [...this.state.messages, notifyLeave]
    });
  }

  typingNotify(data) {
    const { typingusers } = this.state;
    const index = typingusers.indexOf(data.user);
    if (data.typing && index === -1) {
      typingusers.push(data.user);
      this.setState({ typingusers });
    }
    else if (!data.typing && index !== -1) {
      typingusers.splice(index, 1);
      this.setState({ typingusers });
    }
  }

  handleSubmit(data) {
    this.socket.emit('message', { name: this.state.user, text: data.text });
  }

  timeoutFunction() {
    this.setState({ typing: false });
    this.socket.emit('typing', { name: this.state.user, typing: false });
  }

  handleChange() {
    if (this.state.timeout) {
      clearTimeout(this.state.timeout);
    }
    this.setState({
      typing: true,
      timeout: setTimeout(() => {
        this.timeoutFunction(this.state.user);
      }, 2000)
    });
    this.socket.emit('typing', { name: this.state.user, typing: true });
  }

  handleTyping(eachUserTyping, idx, arr) {
    if (arr.length === 1) {
      return (<div key={idx + eachUserTyping}>{eachUserTyping} is typing a message</div>);
    }
    return (<div key={idx + eachUserTyping}>{arr.length} people are typing</div>);
  }

  dataChanged(data){
    this.socket.emit('namechange', { name: data.name });
  }

  render() {
    return (
      <div className="chatbox">
        <InlineEdit
          text={this.state.user}
          change={this.dataChanged}
          paramName="name"
        />
        <UsersList users={this.state.users} />
        <MessageList messages={this.state.messages} />
        <InputForm
          onMessageSubmit={this.handleSubmit}
          user={this.state.user}
          typing={this.handleChange}
        />
        {this.state.typingusers.map(this.handleTyping)}
      </div>
    );
  }
}

export default chatBox;
