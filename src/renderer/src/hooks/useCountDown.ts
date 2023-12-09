import { ref } from "vue"

export default (countDownInitVal: number = 60) => {
  const countDown = ref(countDownInitVal)
  let timer: NodeJS.Timeout

  const doCountDown = () => {
    clearInterval(timer)
    timer = setInterval(() => {
      countDown.value -= 1
      if(countDown.value <= 0) {
        countDown.value = 60
        clearInterval(timer)
      }
    }, 1000);
  }
  
  const stopCountDown = () => {
    clearInterval(timer)
  }

  return {countDown, doCountDown, stopCountDown}
}