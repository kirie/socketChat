import React, { Component } from 'react';

class makeName extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: ''
    };

    this.handleNameSubmit = this.handleNameSubmit.bind(this);
    this.changeNameHandler = this.changeNameHandler.bind(this);
  }

  handleNameSubmit(event) {
    event.preventDefault();
    this.props.onNameSubmit(this.state.text);
    this.setState({ text: '' });
  }

  changeNameHandler(event) {
    event.preventDefault();
    this.setState({ text : event.target.value });
  }

  render() {
    return (
      <div className="nameForm">
        Enter a name and chat 
        <form onSubmit={this.handleNameSubmit}>
          <input value={this.state.text} onChange={this.changeNameHandler} />
        </form>
      </div>
    );
  }
}

export default makeName;
