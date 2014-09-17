var app           = require('app')
  , BrowserWindow = require('browser-window')

var morkdownWindow
  , port = process.argv[2]

app.on('window-all-closed', function() {
  if (process.platform != 'darwin')
    app.quit();
})

app.on('ready', function() {
  morkdownWindow = new BrowserWindow({})
  morkdownWindow.loadUrl('http://localhost:' + port)
})
