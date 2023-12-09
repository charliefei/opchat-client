import {ref} from 'vue'

export default () => {
  const mqList = window.matchMedia('(prefers-color-scheme: dark)')
  const isDarkMode = ref(mqList.matches)  

  const darkModeWatcher = () => {
    mqList.onchange = e => {
      isDarkMode.value = e.matches
    }
  }

  return {
    isDarkMode,
    darkModeWatcher
  }
}