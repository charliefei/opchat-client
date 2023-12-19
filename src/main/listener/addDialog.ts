import { BrowserWindow } from 'electron'

type Options = {
  parentWin: BrowserWindow
}

let addDialogWin: BrowserWindow | null
export const openAddDialogWin = (options: Options) => {
  if (!addDialogWin) {
    addDialogWin = new BrowserWindow({
      width: 300,
      height: 400,
      minimizable: false,
      maximizable: false,
      fullscreenable: false,
      show: false,
      resizable: false,
      parent: options.parentWin,
      frame: false,
      titleBarStyle: 'hidden'
    })
  }

  addDialogWin.on('ready-to-show', () => {
    addDialogWin?.show()
  })

  addDialogWin.on('close', () => {
    addDialogWin = null
  })

  addDialogWin.loadURL(process.env['ELECTRON_RENDERER_URL'] + '/add-dialog')
}
