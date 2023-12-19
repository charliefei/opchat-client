import { contextBridge } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

const api = {
  openAddDialogWin: () => {
    electronAPI.ipcRenderer.send('open-add-dialog')
  },
}

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
