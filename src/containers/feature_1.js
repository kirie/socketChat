import React, { Component } from 'react';
import { connect } from 'react-redux';

class Feat1 extends Component {

  constructor(props) {
    super(props);
    this.state = {
      term: ''
    };
    this.onInputChange = this.onInputChange.bind(this);
  }

  onInputChange(event) {
    this.setState({ term: event.target.value });
  }

  render() {
    return (
      <div>
        <div className="feature1">
          <div className="statemsg">
            {this.props.msg}
          </div>
          <div>
            <form onSubmit={event => event.preventDefault()}>
              <input value={this.state.term} onChange={this.onInputChange} />
            </form>
          </div>
        </div>
        {this.state.term}      
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    msg: state.feature.greeting
  };
}

export default connect(mapStateToProps)(Feat1);
