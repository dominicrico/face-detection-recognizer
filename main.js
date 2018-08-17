const { app, BrowserWindow, ipcMain, remote } = require('electron')
const path = require('path')

const bridge = require('./lib/bridge')

require('electron-debug')()

let main

function createMainWindow () {
  main = new BrowserWindow({
    webPreferences: {
      nodeIntegrationInWorker: true
    },
    show: false
  })

  main.loadFile(`${path.join(__dirname, 'index.html')}`)

  main.on('closed', () => {
    main = null
  })

  main.on('ready-to-show', () => {
    bridge()
    main.show()
  })
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (main === null) {
    createWindow()
  }
})


app.on('ready', createMainWindow)
