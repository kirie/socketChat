import React, { Component, PropTypes } from 'react';

class message extends Component {

  others() {
    return (
      <div>
        {this.props.user}
      </div>
    );
  }

  render() {
    const leftRight = this.props.user === this.props.actual ? 'message right' : 'message left';

    if (this.props.servermsg) {
      return (
        <div className="servermsg">
          <h5>{this.props.text}</h5>
        </div>
      );
    }

    return (
      <div className={leftRight}>
        <div className="others">{leftRight === 'message left' ? this.others() : null}</div>
        <p>
          {this.props.text}
        </p>
      </div>
    );
  }
}

message.propTypes = {
  text: PropTypes.string,
  user: PropTypes.string,
  actual: PropTypes.string
};


export default message;
