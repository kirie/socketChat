import React, { Component } from 'react';
import io from 'socket.io-client';
import UsersList from './users_list';
import MessageList from './message_list';
import InputForm from './input_form';
import MakeName from './make_name';

class chatBox extends Component {

  constructor(props) {
    super(props);

    this.state = {
      users: [],
      messages: [],
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
    this.nameSubmit = this.nameSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.socket = io('http://localhost:3000');
    this.socket.on('initialSetup', this.initialSetup);
    this.socket.on('incoming', this.incoming);
    this.socket.on('userJoin', this.userJoined);
    this.socket.on('userLeft', this.userLeft);
    this.socket.on('typingNotify', this.typingNotify);
  }

  initialSetup(data) {
    this.setState({ users: data.users, user: data.name });
  }

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

  typingNotify(data) {
    console.log('someones typing...', data);
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

  handleSubmit(message) {
    this.setState({ messages: [...this.state.messages, message] });
    this.socket.emit('send:message', message);
  }

  timeoutFunction(user) {
    console.log('typing false', user);
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
    console.log('handlechange state: ', this.state.typing);
  }

  nameSubmit(name) {
    this.setState({ user });
  }

  render() {
    if(!this.state.user) {
      return (
        <MakeName onNameSubmit={this.nameSubmit} />
      );
    }

    return (
      <div className="chatbox">
        <UsersList users={this.state.users} />
        <MessageList messages={this.state.messages} />
        <InputForm
          onMessageSubmit={this.handleSubmit}
          user={this.state.user}
          typing={this.handleChange}
        />
      </div>
    );
  }
}

export default chatBox