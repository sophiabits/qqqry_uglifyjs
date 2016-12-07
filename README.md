# qqqry:uglifyjs
Installation:
```
$ meteor remove standard-minifier-js
$ meteor add qqqry:uglifyjs
```

Extended version of standard-minifier-js. You can specify your own UglifyJS options by setting adding a key to package.json:

```
{
  "name": "...",
  "private": true,
  "scripts": {
    "start": "meteor run"
  },
  "dependencies": {
    ...
  },

  "uglifyjs": {
    "fromString": true,
    "mangle": true,
    "compress": {
      "drop_debugger": true,
      "unused": false,
      "dead_code": false
    }
  }
}
```