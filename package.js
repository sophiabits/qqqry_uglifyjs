Package.describe({
  name: 'qqqry:uglifyjs',
  version: '1.0.1',
  summary: 'UglifyJS minifier that allows you to set your own minification options.',
  documentation: 'README.md'
});

Package.registerBuildPlugin({
  name: "minifyStdJS",
  use: [
    'minifier-js@1.2.15'
  ],
  sources: [
    'plugin/minify-js.js'
  ]
});

Package.onUse(function(api) {
  api.use('isobuild:minifier-plugin@1.0.0');
});

Package.onTest(function(api) {
});
