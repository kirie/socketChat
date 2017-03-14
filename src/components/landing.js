import React, { Component } from 'react';
import Chatbox from './chatbox';

export default class Landing extends Component {
  render() {
    return (
      <div className="landing">
        <Chatbox />
        <Chatbox />
      </div>
    );
  }
}
