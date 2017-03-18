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
    const time = moment(rawStr).format('hh:mm a');

    if (daysSince < 1) {
      stamp = `${time}`;
    }
    else if (daysSince < 7) {
      stamp = `${dayOfWeek} ${time}`;
    }
    else {
      stamp = olderDate;
    }
    return (
      <div>{stamp}</div>
    );
  }

  render() {
    const leftRight = this.props.mine ? 'message right' : 'message left';
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
        <div className="msgtext">
          {this.props.text}
          <div className="timestamp">{this.parseTimestamp(this.props.time)}</div>
        </div>
      </div>
    );
  }
}

message.propTypes = {
  text: PropTypes.string,
  user: PropTypes.string,
  mine: PropTypes.bool,
  servermsg: PropTypes.bool
};


export default message;
