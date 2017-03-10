import React from 'react';
import ReactDOM from 'react-dom';
import Chatbox from './components/chatbox';
import './stylesheets/main.scss';

const App = () => {
  return (
    <div className="AppMain">
      <Chatbox />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));