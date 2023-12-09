import { is } from "@electron-toolkit/utils";
import { BrowserWindow, ipcMain } from "electron";
import { join } from 'path'

export const createChildWin = (parent: BrowserWindow) => {
  ipcMain.handle('open-win', (_, routePath) => {
    const addWin = new BrowserWindow({
      title: '加好友/群',
      width: 300,
      height: 400,
      parent,
      show: false
    })
    addWin.on('ready-to-show', () => addWin.show())
    if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
      // dev模式热更新
      addWin.loadURL(process.env['ELECTRON_RENDERER_URL'] + `${routePath}`)
    } else {
      // prod模式
      addWin.loadFile(join(__dirname, '../renderer/index.html' + routePath))
    }
  })
}

