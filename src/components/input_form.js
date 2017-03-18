import React, { Component, PropTypes } from 'react';

class inputForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      typing: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.changeHandler = this.changeHandler.bind(this);
  }

  // Handle new message submission. Run onMessageSubmit from props
  handleSubmit(event) {
    event.preventDefault();
    const message = {
      text: this.state.text
    };
    this.props.onMessageSubmit(message);
    this.setState({ text: '' });
  }

  // Handle typing of any characters.  Run typing() from props
  changeHandler(event) {
    this.props.typing();
    this.setState({ text: event.target.value });
  }

  render() {
    return (
      <div>
        <form className="chat-input" onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="Message..."
            onChange={this.changeHandler}
            value={this.state.text}
          />
        </form>
      </div>
    );
  }
}

inputForm.propTypes = {
  onMessageSubmit: PropTypes.func.isRequired,
  typing: PropTypes.func.isRequired
};

export default inputForm;
