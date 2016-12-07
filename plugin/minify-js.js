Plugin.registerMinifier({
  extensions: ["js"],
  archMatching: "web"
}, function () {
  var minifier = new UglifyJSMinifier();
  return minifier;
});

var fs = Plugin.fs;
var path = Plugin.path;

var PACKAGE_FILE = 'package.json';
var packageFile = path.resolve(process.cwd(), PACKAGE_FILE);

var loadJSONFile = (filePath) => {
  var content;
  try {
    content = fs.readFileSync(filePath);
    try {
      return JSON.parse(content);
    } catch (e) {
      console.log('Error: failed to parse ', filePath, ' as JSON');
    }
  } catch (e) {
    return null;
  }
};

function UglifyJSMinifier () {};

UglifyJSMinifier.prototype.processFilesForBundle = function(files, options) {
  var mode = options.minifyMode;

  // don't minify anything for development
  if (mode === 'development') {
    files.forEach(function (file) {
      file.addJavaScript({
        data: file.getContentsAsBuffer(),
        sourceMap: file.getSourceMap(),
        path: file.getPathInBundle()
      });
    });
    return;
  }

  var defaultOptions = {
    fromString: true,
    compress: {
      drop_debugger: false,
      unused: false,
      dead_code: false
    }
  };

  var config;

  var packageJson = loadJSONFile(packageFile);
  if (packageJson && packageJson.uglifyjs) {
    config = Object.assign(defaultOptions, packageJson.uglifyjs);
  } else {
    config = Object.assign(defaultOptions);
  }

  var allJs = '';
  files.forEach(function (file) {
    // Don't reminify *.min.js.
    allJs += file.getContentsAsString();
    /*if (/\.min\.js$/.test(file.getPathInBundle())) {
      allJs += file.getContentsAsString();
    } else {
      allJs += UglifyJSMinify(file.getContentsAsString(), config).code;
    }
    allJs += '\n\n';*/

    Plugin.nudge();
  });

  var minifiedJs = UglifyJSMinify(allJs, config).code;

  if (files.length) {
    files[0].addJavaScript({ data: minifiedJs });
  }
};


