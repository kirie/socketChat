import React, {Component} from 'react';

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

  handleSubmit(event) {
    event.preventDefault();
    const message = {
      user: this.props.user,
      text: this.state.text
    };
    this.props.onMessageSubmit(message);  
    this.setState({ text: '' });
  }

  changeHandler(event) {
    this.props.typing();
    this.setState({ text : event.target.value });
  }

  render() {
    return(
      <div className='inputForm'>
        <h3>Write New Message</h3>
        <form onSubmit={this.handleSubmit}>
          <input
            onChange={this.changeHandler}
            value={this.state.text}
          />
        </form>
      </div>
    );
  }
}

export default inputForm;
