import React from 'react';
import {Route} from 'react-router';

import App from './containers/App';
import Adder from './containers/Adder';

export default (
  <Route name="app" component={App} path="/">
    <Route component={Adder} path="adder" />
  </Route>
);
