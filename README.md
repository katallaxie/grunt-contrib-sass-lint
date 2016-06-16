# grunt-contrib-sass-lint

> A grunt task to employ sass-lint for better Sass

## Getting started

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-contrib-sass-lint --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-contrib-sass-lint');
```

## Sass-lint Task

> Run this task with `grunt sass-lint` command.

Task targets, files and options may be specified according to the grunt [Configuring tasks](http://gruntjs.com/configuring-tasks) guide.

### Options

Please, only provide a `String` to `grunt.file.src` in your target config.

#### config
Type: `String`

This options resembles with the `configPath` option of `sass-lint`.

* if so not provided, it is searched for `.sass-lint.yml` in the cwd.

---
Task coded and submitted by [Sebastian Döll](http://github.com/katallaxie)
