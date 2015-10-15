import koa from 'koa';
import React from 'react';
import ReactDOM from 'react-dom/server';
import {RoutingContext, match} from 'react-router';
import createLocation from 'history/lib/createLocation';
import routes from 'routes';

import createStore from 'stores';
import {Provider} from 'react-redux';
import reducer from 'reducers';

import {fromJS} from 'immutable';

const app = koa();

app.use(handleRender);

function* handleRender() {
  const location = createLocation(this.request.url);
  const store = createStore(reducer);

  match({routes, location}, (err, redirectLocation, renderProps) => {
    if(err) {
      console.log(err);
      this.status = 500;
      this.body = 'Internal server error.';
      return;
    }

    if(!renderProps) {
      this.status = 404;
      this.body = 'Not found.';
      return;
    }

    const initialComponent = (
      <Provider store={store}>
        <RoutingContext {...renderProps} />
      </Provider>
    );

    const initialState = store.getState();
    const html = ReactDOM.renderToString(initialComponent);

    this.body = renderFullPage(html, initialState);
  });
}

function renderFullPage(html, initialState) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <title>React Redux Boilerplate</title>
        <script>
          window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};
        </script>
      </head>
      <body>
        <div id="app">${html}</div>
        <script src="bundle.js"></script>
      </body>
    </html>
  `;
}

export default app;
