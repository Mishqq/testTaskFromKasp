"use strict";

module.exports = {
  build: {
    html: 'build/templates/',
    js: 'build/js/',
    css: 'build/css/',
    img: 'build/img/'
  },
  src: {
    html: './src/components/**/*.html',
    js: ['./src/modules/*.js', 'src/**/*.js'],
    style: ['./src/*.styl', 'src/**/*.styl'],
    img: './src/img/**/*.*',
    font: ['./src/style/fonts/*.otf',
      './src/style/fonts/*.eot',
      './src/style/fonts/*.svg',
      './src/style/fonts/*.ttf',
      './src/style/fonts/*.woff',
      './src/style/fonts/*.woff2']
  },
  watch: {
    html: ['./src/**/*.html'],
    js: ['./src/*.js', 'src/**/*.js'],
    style: ['./src/**/*.styl'],
    img: ['./src/img/**/*.*']
  },
  clean: './build',
  serverSettings: {
    server: {
      baseDir: "."
    },
    tunnel: true,
    host: 'localhost',
    port: 9000,
    logPrefix: "Frontend_Devil"
  }
};
