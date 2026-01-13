/**
 * 本地存储工具
 * 用于防刷机制和数据持久化
 */

const STORAGE_PREFIX = 'horse_fortune_'

/**
 * 设置本地存储
 */
export function setStorage(key, value) {
  try {
    const data = JSON.stringify(value)
    localStorage.setItem(STORAGE_PREFIX + key, data)
    return true
  } catch (error) {
    console.error('存储数据失败:', error)
    return false
  }
}

/**
 * 获取本地存储
 */
export function getStorage(key) {
  try {
    const data = localStorage.getItem(STORAGE_PREFIX + key)
    return data ? JSON.parse(data) : null
  } catch (error) {
    console.error('读取数据失败:', error)
    return null
  }
}

/**
 * 删除本地存储
 */
export function removeStorage(key) {
  try {
    localStorage.removeItem(STORAGE_PREFIX + key)
    return true
  } catch (error) {
    console.error('删除数据失败:', error)
    return false
  }
}

/**
 * 清空所有本地存储
 */
export function clearStorage() {
  try {
    const keys = Object.keys(localStorage)
    keys.forEach(key => {
      if (key.startsWith(STORAGE_PREFIX)) {
        localStorage.removeItem(key)
      }
    })
    return true
  } catch (error) {
    console.error('清空数据失败:', error)
    return false
  }
}

/**
 * 防刷限制器
 */
export class RateLimiter {
  constructor(maxAttempts = 5, storageKey = 'rate_limit') {
    this.maxAttempts = maxAttempts
    this.storageKey = storageKey
  }

  /**
   * 检查是否可以继续尝试
   */
  canAttempt() {
    const data = this.getAttempts()
    const today = this.getToday()

    if (data.date !== today) {
      // 新的一天，重置计数
      return true
    }

    return data.count < this.maxAttempts
  }

  /**
   * 记录一次尝试
   */
  recordAttempt() {
    const data = this.getAttempts()
    const today = this.getToday()

    if (data.date !== today) {
      // 新的一天，重置计数
      setStorage(this.storageKey, {
        date: today,
        count: 1
      })
    } else {
      // 增加计数
      data.count++
      setStorage(this.storageKey, data)
    }
  }

  /**
   * 获取尝试记录
   */
  getAttempts() {
    const data = getStorage(this.storageKey)
    return data || { date: '', count: 0 }
  }

  /**
   * 获取剩余次数
   */
  getRemainingAttempts() {
    const data = this.getAttempts()
    const today = this.getToday()

    if (data.date !== today) {
      return this.maxAttempts
    }

    return Math.max(0, this.maxAttempts - data.count)
  }

  /**
   * 重置计数
   */
  reset() {
    removeStorage(this.storageKey)
  }

  /**
   * 获取今天的日期字符串
   */
  getToday() {
    return new Date().toDateString()
  }

  /**
   * 获取下次重置时间
   */
  getNextResetTime() {
    const now = new Date()
    const tomorrow = new Date(now)
    tomorrow.setDate(tomorrow.getDate() + 1)
    tomorrow.setHours(0, 0, 0, 0)
    return tomorrow
  }

  /**
   * 获取距离重置的剩余时间（毫秒）
   */
  getTimeUntilReset() {
    const now = new Date()
    const nextReset = this.getNextResetTime()
    return nextReset - now
  }

  /**
   * 格式化剩余时间
   */
  formatTimeUntilReset() {
    const ms = this.getTimeUntilReset()
    const hours = Math.floor(ms / (1000 * 60 * 60))
    const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60))
    return `${hours}小时${minutes}分钟`
  }
}

/**
 * 保存历史记录
 */
export function saveHistory(record) {
  const history = getStorage('history') || []
  history.unshift({
    ...record,
    timestamp: Date.now()
  })
  // 只保留最近20条
  if (history.length > 20) {
    history.length = 20
  }
  setStorage('history', history)
}

/**
 * 获取历史记录
 */
export function getHistory() {
  return getStorage('history') || []
}

/**
 * 清空历史记录
 */
export function clearHistory() {
  removeStorage('history')
}