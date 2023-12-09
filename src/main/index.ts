import { app, shell, BrowserWindow } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import createTray from './tray'
// @ts-ignore
import { createChildWin } from './event'

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 950,
    height: 600,
    minWidth: 840,
    minHeight: 540,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    },
    frame: false,
    titleBarStyle: 'hidden',
    fullscreenable: false,
    transparent: true
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  // 默认浏览器打开外链
  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    // dev模式热更新
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    // prod模式
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }

  return mainWindow
}

app.whenReady().then(() => {
  electronApp.setAppUserModelId('com.electron')

  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  const mainWindow = createWindow()
  // 创建系统托盘图标
  createTray()
  createChildWin(mainWindow)

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  app.hide()
})
