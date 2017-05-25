'use strict';

if (process.env.TRACE) {
  require('./libs/trace');
}

const config = require('config');
const path = require('path');
const fs = require('fs');
const Koa = require('koa');

const app = new Koa();

// app.keys = [config.secret]


require('./models/user');

const handlers = fs.readdirSync(path.join(__dirname, 'handlers')).sort();
handlers.forEach(handler => require('./handlers/' + handler).init(app));


app.use(require('./routes').routes());
app.use(require('./routes').allowedMethods());

app.listen(config.get('app.port'));

