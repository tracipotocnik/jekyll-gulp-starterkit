# gulp-jekyll

Jekyll + Gulp.js + BrowserSync + SCSS + Stylelint

## Features

- Sass.
- UnCSS for production.
- Jekyll build and rebuild with BrowserSync live reload.
- Browserify or just gulp-concat, as you prefer.
- Optimization (and minification) of images, HTML, CSS, JavaScript, JSON, and XML files.
- Linting with JSHint and Stylelint.
- Sourcemap generation.
- Image sprites.
- Gzip compression.
- Asset file revisions.
- WebP image generation.
- Deployment with rsync or [s3_website](https://github.com/laurilehmijoki/s3_website).

### What’s Coming Next

- User-guide
- Modularizing the default Jekyll theme, to make use of the new 7-1 pattern
- JSON-LD generator

## Prerequisites

Node.js (and npm, included), use [NVM](https://github.com/creationix/nvm) to install and manage versions. Currently tested with Node.js `v6.10.1` (LTS).

Ruby, use [rbenv](https://github.com/rbenv/rbenv) to install and manage versions. Currently tested with ruby `2.3.1p112`.

[Bundler](https://github.com/bundler/bundler), install with:

```sh
gem install bundler
```

[bower](https://github.com/bower/bower), install with:

```sh
npm install -g bower
```

## Installation

Clone the repository on your computer and change into the projects folder. Run:

```sh
$ bundle
$ bower install
$ npm install
```

## Setup

Open `gulp/config.js` and change settings if needed.

## Running Gulp.js

Three tasks are available:

```sh
$ gulp
$ gulp publish
$ gulp deploy
```

- Running `gulp` will start a development server, build assets and the Jekyll site and start a `watch` task.
- Running `gulp publish` will copy and optimize assets and run a production build of Jekyll.
- Running `gulp deploy` will copy the generated files with Rsync to your server.

---

## Credits

- gulp-jekyll started out as a fork of Stefan Imhoff’s wonderful [Gulp.js series](https://github.com/kogakure/gulp-tutorial).
- [Michael Xander](http://michaelxander.com)