import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useFortuneStore = defineStore('fortune', () => {
  // 当前签号
  const signId = ref(null)
  
  // 当前签类
  const signType = ref('fortune')
  
  // 当前签文结果
  const currentSign = ref(null)
  
  // 历史记录
  const history = ref([])
  
  // 设置签号
  const setSignId = (id) => {
    signId.value = id
  }
  
  // 设置签类
  const setSignType = (type) => {
    signType.value = type
  }
  
  // 设置当前签文
  const setCurrentSign = (sign) => {
    currentSign.value = sign
    // 添加到历史记录
    history.value.unshift({
      ...sign,
      timestamp: Date.now()
    })
    // 只保留最近10条记录
    if (history.value.length > 10) {
      history.value = history.value.slice(0, 10)
    }
  }
  
  // 获取当前签文
  const getCurrentSign = () => {
    return currentSign.value
  }
  
  // 获取历史记录
  const getHistory = () => {
    return history.value
  }
  
  // 清除历史记录
  const clearHistory = () => {
    history.value = []
  }
  
  return {
    signId,
    signType,
    currentSign,
    history,
    setSignId,
    setSignType,
    setCurrentSign,
    getCurrentSign,
    getHistory,
    clearHistory
  }
})