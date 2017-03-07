import React, { Component } from 'react';

export default class App extends Component {
  render() {
    return (
      <div id="appwrap">
        {this.props.children}
      </div>
    );
  }
}
