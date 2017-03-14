import React, { Component } from 'react';

class message extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div className="message right">
          <p>{this.props.user}: {this.props.text}</p>
        </div>
      </div>
    );
  }
}

export default message;
