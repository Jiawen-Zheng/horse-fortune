import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useUserStore = defineStore('user', () => {
  // 用户信息 - 新的趣味化字段
  const nickname = ref('')
  const luckyNumber = ref(50)
  const luckyColor = ref('') // red, gold, orange, yellow, green, cyan, blue, purple, pink, brown, white, black
  
  // 选择的签类
  const signType = ref('fortune') // fortune, career, study, health, love, wealth
  
  // 设置用户信息
  const setUserInfo = (info) => {
    nickname.value = info.nickname || ''
    luckyNumber.value = info.luckyNumber || 50
    luckyColor.value = info.luckyColor || ''
  }
  
  // 设置签类
  const setSignType = (type) => {
    signType.value = type
  }
  
  // 重置用户信息
  const resetUserInfo = () => {
    nickname.value = ''
    luckyNumber.value = 50
    luckyColor.value = ''
  }
  
  // 获取用户信息
  const userInfo = computed(() => ({
    nickname: nickname.value,
    luckyNumber: luckyNumber.value,
    luckyColor: luckyColor.value,
    signType: signType.value
  }))
  
  return {
    nickname,
    luckyNumber,
    luckyColor,
    signType,
    userInfo,
    setUserInfo,
    setSignType,
    resetUserInfo
  }
})