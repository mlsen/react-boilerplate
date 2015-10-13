import React from 'react';
import ReactDOM from 'react-dom';
import {Router} from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import routes from 'routes';

import createStore from 'stores';
import {Provider} from 'react-redux';
import reducer from 'reducers';

import {fromJS} from 'immutable';

const history = createBrowserHistory();
const initialState = window.__INITIAL_STATE__;

const store = createStore(reducer, {
  names: fromJS(initialState.names)
});

ReactDOM.render(
  <Provider store={store}>
    <Router children={routes} history={history} />
  </Provider>,
  document.getElementById('app')
);
