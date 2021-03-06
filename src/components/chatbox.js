import React, { Component } from 'react';
import io from 'socket.io-client';
import moment from 'moment';
import InlineEdit from 'react-edit-inline';
import UsersList from './users_list';
import MessageList from './message_list';
import InputForm from './input_form';
import TypingUsers from './typing_users';

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

  // Initial setup.
  initialSetup(data) {
    this.setState({ users: data.users, user: data.name });
  }

  // On recieved name change update their name
  changedName(data) {
    const { users } = this.state;
    const index = users.indexOf(data.formerName);
    users.splice(index, 1);
    users.push(data.name);
    const temp = {
      user: 'Notification',
      servermsg: true,
      text: `${data.formerName} changed their name to ${data.name}`
    };
    if (data.formerName === this.state.user) {
      this.setState({
        users,
        messages: [...this.state.messages, temp],
        user: data.name
      });
    }
    else {
      this.setState({
        users,
        messages: [...this.state.messages, temp]
      });
    }
  }

  // Incoming messages from other users
  incoming(msg) {
    this.setState({ messages: [...this.state.messages, msg] });
  }

  // On userjoined message
  userJoined(data) {
    const notifyJoin = {
      user: 'Notification ',
      servermsg: true,
      text: ` ${data.name} has joined the chat`
    };
    this.setState({
      users: [...this.state.users, data.name],
      messages: [...this.state.messages, notifyJoin]
    });
  }

  // On userleft message
  userLeft(data) {
    const { users } = this.state;
    const index = users.indexOf(data.name);
    users.splice(index, 1);
    const notifyLeave = {
      user: 'Notification ',
      servermsg: true,
      text: ` ${data.name} has left the chat`
    };
    this.setState({
      users: [users],
      messages: [...this.state.messages, notifyLeave]
    });
  }

  // logic for adding/removing typing users
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

  // Submit a message. 'mine' key determines whether this client sent it
  handleSubmit(data) {
    if (data.text !== '') {
      const msg = {
        name: this.state.user,
        time: moment(),
        servermsg: false,
        text: data.text,
        mine: false
      };
      this.socket.emit('message', msg);
      msg.mine = true;
      this.setState({ messages: [...this.state.messages, msg] });
    }
  }

  // User stopped typing. Emit typing to be false
  timeoutFunction() {
    this.setState({ typing: false });
    this.socket.emit('typing', { name: this.state.user, typing: false });
  }

  // Handle a user typing
  handleChange() {
    if (this.state.timeout) {
      clearTimeout(this.state.timeout);
    }
    this.setState({
      typing: true,
      timeout: setTimeout(() => {
        this.timeoutFunction(this.state.user);
      }, 600)
    });
    this.socket.emit('typing', { name: this.state.user, typing: true });
  }

  // Name change w/ React Inline Edit
  dataChanged(data) {
    if (this.state.users.indexOf(data.name) === -1) {
      this.socket.emit('namechange', { name: data.name });
    }
    else {
      this.setState({ user: this.state.user });
    }
  }

  render() {
    return (
      <div className="chatbox">
        <div className="nametitle">
          <InlineEdit
            className="inlineedit"
            activeClassName="editing"
            text={this.state.user}
            change={this.dataChanged}
            paramName="name"
          />
          <i className="fa fa-pencil" aria-hidden="true" />
        </div>
        <UsersList users={this.state.users} />
        <MessageList
          user={this.state.user}
          messages={this.state.messages}
        />
        <InputForm
          onMessageSubmit={this.handleSubmit}
          user={this.state.user}
          typing={this.handleChange}
        />
        <TypingUsers typing={this.state.typingusers} />
      </div>
    );
  }
}

export default chatBox;
