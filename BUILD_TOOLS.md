If you haven't already, let's install Webpack and it's dev server:
```sh
npm install --save-dev webpack webpack-dev-server babel-core babel-loader angular angular-ui-router angular-loader
```

This adds these node modules to the `package.json` file, and also installs some binaries in the project's `/node_modules/.bin/` directory.

Webpack allows you to bundle your assets and gives them and implements a node-like `require` mechanisim, so we can start treating javascript like a real programming language with module loading and exporting.

Let's take a quick look at what it can do from the command-line:
```sh
webpack app/app.js app/bundle.js
```

However, webpack by default looks for a `webpack.config.js` file, and uses that if found.

Drop this file into the root of your project:

__webpack.config.js__
```js
module.exports = {
  // entry points into the app
  entry: {
    // this will be output to app/bundle.js
    bundle: './app/manifest.js',
    // These are nodeJS require/import strings, and will be bundled if installed with npm to vendor.js
    vendor: ['angular', 'angular-ui-router', 'angular-loader']
  },
  // generate sourcemaps to aid debugging
  devtool: 'source-map',
  output: {
    path: __dirname + '/app',
    // output to same name as "entry" key
    filename: "[name].js"
  },
  module: {
    loaders: [
      // for any .js files (except in node_modules), run through babel-loader so you can write ES6+
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'}
    ]
  }
};
```

This will load up your "entry" file, and everything it imports or requires will be pulled into the `bundle.js` file whenever you run `webpack`, or `webpack-dev-server`.

`webpack-dev-server` is great because it bundles your files in memory (and doesn't even write them to disk), and when code changes, it picks up on the filesystem event, and rebuilds only the code that is necessary in the file you edited and its dependencies.

Go into `index.html`, and replace the script tag for `app.js` with `bundle.js`, and all the angular dependencies with `vendor.js`
__index.html__
```html
<script src="vendor.js"></script>
<script src="bundle.js"></script>
```

And add this to your `package.json` to make it easier to kick off webpack and run the app with all the flags we want:

__package.json__
```js
"scripts": {
  "start": "./node_modules/.bin/webpack-dev-server --hot --progress --colors --content-base app/",
  "build": "./node_modules/.bin/webpack",
```

Now we can run `npm start` to make sure we have everything installed and start webpack, or run `npm run build` to output a file to disk for deployment.

You'll probably want to prevent yourself from checking this into source control, so add this to `.gitignore`:
```
app/vendor.js
app/bundle.js
app/*.js.map
```

Now you can import and require npm modules in your code, or other files in the app.

Let's move the requiring of our files into a new file in `app/manifest.js`, to serve as our entry point:
__app/manifest.js__
```js
import './app.js'
import './services/constants.js'
import './login/login.js'
import './login/login-service.js'
import './login/auth-token.js'
import './login/current-user.js'
import './login/auth-interceptor.js'
import './notes/notes.js'
import './notes/notes-service.js'
import './directives/bd-focus.js'
import './directives/bd-user-links.js'
import './directives/bd-notes-list.js'
```

If things are working, lets try to use some ES6 features to make sure this is working:
__app/app.js__
```js
(function() {
  console.log('ES6, yo')
  let app = angular.module('notely', [
//..
```

YAY!
