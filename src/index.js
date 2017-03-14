import React from 'react';
import ReactDOM from 'react-dom';
import './stylesheets/main.scss';
import Routes from './routes';

const App = () => {
  return (
    <div className="AppParent">
      <Routes />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));