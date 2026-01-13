/**
 * 使用次数限制工具
 * 每个用户每天限制使用 10 次
 */

const DAILY_LIMIT = 10 // 每天限制次数

/**
 * 检查今日使用次数
 * @returns {Object} { allowed: boolean, used: number, remaining: number, message: string }
 */
export function checkDailyUsage() {
  // 获取今天的日期（格式：2026-01-12）
  const today = new Date().toISOString().split('T')[0]
  
  // 从本地存储获取使用记录
  const usageData = JSON.parse(localStorage.getItem('fortuneUsage') || '{}')
  
  // 如果不是今天的记录，重置为0
  if (usageData.date !== today) {
    usageData.date = today
    usageData.count = 0
    localStorage.setItem('fortuneUsage', JSON.stringify(usageData))
  }
  
  const used = usageData.count || 0
  const remaining = DAILY_LIMIT - used
  
  if (remaining <= 0) {
    return {
      allowed: false,
      used: used,
      remaining: 0,
      message: `今日使用次数已用完（${used}/${DAILY_LIMIT}次）\n\n明天再来免费使用吧！`
    }
  }
  
  return {
    allowed: true,
    used: used,
    remaining: remaining,
    message: `今日剩余次数：${remaining}/${DAILY_LIMIT}次`
  }
}

/**
 * 记录一次使用
 */
export function recordUsage() {
  const today = new Date().toISOString().split('T')[0]
  const usageData = JSON.parse(localStorage.getItem('fortuneUsage') || '{}')
  
  if (usageData.date !== today) {
    usageData.date = today
    usageData.count = 1
  } else {
    usageData.count = (usageData.count || 0) + 1
  }
  
  localStorage.setItem('fortuneUsage', JSON.stringify(usageData))
}

/**
 * 获取使用统计
 */
export function getUsageStats() {
  const today = new Date().toISOString().split('T')[0]
  const usageData = JSON.parse(localStorage.getItem('fortuneUsage') || '{}')
  
  if (usageData.date !== today) {
    return { used: 0, remaining: DAILY_LIMIT }
  }
  
  return {
    used: usageData.count || 0,
    remaining: DAILY_LIMIT - (usageData.count || 0)
  }
}