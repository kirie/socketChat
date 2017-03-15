import React, { Component, PropTypes } from 'react';
import moment from 'moment';

class message extends Component {

  others() {
    return (
      <div>
        {this.props.user}
      </div>
    );
  }

  parseTimestamp(rawStr) {
    let stamp = '';
    const daysSince = moment().diff(rawStr, 'days');
    const olderDate = moment(rawStr).format('MM/DD/YYYY');
    const dayOfWeek = moment(rawStr).format('ddd');
    const time = moment(rawStr).format("hh:mm a");
    if (daysSince < 7) {
      stamp = `${dayOfWeek} - ${time}`;
    }
    else {
      stamp = olderDate;
    }

    return (
      <div>{stamp}</div>
    ) 
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
        <div className="timestamp">{this.parseTimestamp(this.props.time)}</div>
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
