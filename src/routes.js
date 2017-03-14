import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import App from './components/app';
import NotFound from './components/not_found';
import Landing from './components/landing';

const Routes = () => {
  return (
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Landing} />
        <Route path="*" component={NotFound} />
      </Route>
    </Router>
  );
};

export default Routes;
