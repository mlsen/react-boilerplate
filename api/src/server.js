const koa = require('koa');
const app = koa();

app.use(function *() {
  this.body = 'blubblbdab';
});

app.listen(3000);
