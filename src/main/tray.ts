import { Tray } from 'electron'
// @ts-ignore
import traymenu from './menu/traymenu'
import path from 'path'

const createTray = () => {
  const tray = new Tray(
    path.resolve(
      __dirname,
      process.platform == 'darwin'
        ? '../../resources/opchatTemplate@2x.png'
        : '../../resources/opchat.png'
    )
  )

  tray.setToolTip('OpChat')

  tray.addListener('right-click', () => {
    tray.popUpContextMenu(traymenu)    
  })
}

export default createTray
