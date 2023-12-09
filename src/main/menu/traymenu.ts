import { Menu, MenuItem } from "electron";

const menuTemplate = [
  {
    label: '退出',
    role: 'quit'
  }
] as MenuItem[]

export default Menu.buildFromTemplate(menuTemplate)
