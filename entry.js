require('babel-core/register');
require('babel-polyfill');

/*
 * All subsequent files required by node with the extensions .es6, .es, .jsx
 * and .js will be transformed by Babel. The polyfill is also automatically
 * required.
 */

require('./server.js');
