const {app, BrowserWindow} = require('electron')
const express = require('express')
const bodyParser = require('body-parser')
const server = express()

const initialize = () => {
  const options = {
    width: 800,
    height: 600,
    title: "SplashKit Playground Server",
    fullscreenable: true,
    webPreferences: {
      scrollBounce: true
    }
  }
  let win = new BrowserWindow(options)
  win.loadURL(`file://${__dirname}/index.html`)
  win.on('closed', function () {
    win = null
  })
  const port = 8080
  win.webContents.on('did-finish-load', () => {
    win.webContents.send('set-port', port)
  })
  server.use(bodyParser.text({type: "*/*"}))
  server.get('/*', (req, res, next) => {
    win.webContents.send('get-request-recieved', req)
    next()
  })
  server.post('/data', (req, res) => {
    win.webContents.send('post-request-recieved', req)
    res.sendStatus(204)
  })
  server.use(express.static('public'));
  server.listen(port)
}

app.on('ready', initialize)
app.on('window-all-closed', () => {
  app.quit()
})
