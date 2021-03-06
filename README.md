# Serious Chat

## Package Management
* [npm](https://www.npmjs.com/) - Using for Server-side.
* [Bower](http://bower.io/) - Using for Client-side.

## Technology
* [Express 4](http://expressjs.com/) - Fast, unopinionated, minimalist web framework for Node.js.
* [jQuery](https://jquery.com/) - The Write Less, Do More, JavaScript Library.
* [AngularJS](https://angularjs.org/) - AngularJS is what HTML would have been, had it been designed for building web-apps. Declarative templates with data-binding, MVW, MVVM, MVC,...
* [Angular Material](https://material.angularjs.org) - The Angular Material project is an implementation of Material Design in Angular.js. This project provides a set of reusable, well-tested, and accessible UI components based on the Material Design system.

## Middleware
* [Express Handlebars](https://github.com/ericf/express-handlebars) - A Handlebars view engine for Express which doesn't suck.
* [Rusha](https://github.com/srijs/rusha) - A high-performance pure-javascript SHA1 implementation suitable for large binary data.
* [blueimp-md5](https://github.com/blueimp/JavaScript-MD5) - JavaScript MD5 implementation. Compatible with server-side environments like node.js, module loaders like RequireJS and all web browsers.

## Standard
* Email - [RFC 5322 Official Standard](http://www.ietf.org/rfc/rfc5322.txt)

## Config
To config database, open ```/config/config.json```.
```
{
	"development": {
		"username": "root",
		"password": "",
		"database": "serious_chat",
		"host": "127.0.0.1",
		"dialect": "mysql"
	},
	"test": {
		"username": "root",
		"password": "",
		"database": "serious_chat",
		"host": "127.0.0.1",
		"dialect": "mysql"
	},
	"production": {
		"username": "root",
		"password": "",
		"database": "serious_chat",
		"host": "127.0.0.1",
		"dialect": "mysql"
	}
}
```

## Quick start
Install dependencies:
```
bower install
npm install
```

Start the server:
```
npm start
```

## Contributors
* Nam Vo Hoai <vhnam2504@gmail.com>
* Hieu Le Hoang <hieu.gh@gmail.com>

## License
[The MIT License](http://opensource.org/licenses/MIT)