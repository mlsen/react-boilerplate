import koa from 'koa';
import React from 'react';
import ReactDOM from 'react-dom/server';
import {RoutingContext, match} from 'react-router';
import createLocation from 'history/lib/createLocation';
import routes from 'routes';

const app = koa();

app.use(function *() {

  const location = createLocation(this.request.url);

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
      <RoutingContext {...renderProps} />
    );

    const componentHTML = ReactDOM.renderToString(initialComponent);

    this.body = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <title>React Redux Boilerplate</title>
        </head>
        <body>
          <div id="app">${componentHTML}</div>
          <script src="bundle.js"></script>
        </body>
      </html>
    `;
  });

});

export default app;
