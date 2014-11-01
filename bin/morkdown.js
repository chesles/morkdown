#!/usr/bin/env node

var me     = require('..')
  , fs     = require('fs')
  , path   = require('path')
  , argv = (function () {
      var argv = require('optimist').argv
        , def, p
      try {
        def = JSON.parse(fs.readFileSync(path.join(process.env.HOME, '.morkdownrc')))
        for (p in argv)
          def[p] = argv[p]
        argv = def
      } catch (e) {}
      return argv
    }())
  , watching = argv.w
  , file   = watching ? argv.w : argv._[0]
  , port   = argv.port || 2000 + Math.round(Math.random() * 5000)
  , theme  = argv.theme


if (file && fs.existsSync(file) && !fs.statSync(file).isFile()) {
  console.error('File [' + file + '] is not a regular file')
  file = null
}

if (file && !fs.existsSync(file))
  fs.writeFileSync(file, '', 'utf8')

if (!file) {
  console.error('Usage: morkdown <path to file.md>')
  process.exit(-1)
}

me(file, theme, watching).listen(port)

require('node-thrust')(function(err, api) {
  var w = api.window({
    root_url: 'http://localhost:'+port,
  })

  w.show(function(err) {
    console.log(w)
    w.on('closed', function() {
      // TODO - figure out how to kill subprocess started by thrust
      process.exit(0)
    })
  })

})
