/**
 * 使用次数限制工具
 * 已移除使用次数限制，以扩大客流量
 */

const DAILY_LIMIT = 999999 // 无限制

/**
 * 检查今日使用次数
 * @returns {Object} { allowed: boolean, used: number, remaining: number, message: string }
 */
export function checkDailyUsage() {
  // 始终允许使用
  return {
    allowed: true,
    used: 0,
    remaining: DAILY_LIMIT,
    message: '无限制使用'
  }
}

/**
 * 记录一次使用
 */
export function recordUsage() {
  // 不再记录使用次数
  return
}

/**
 * 获取使用统计
 */
export function getUsageStats() {
  // 始终返回无限制
  return {
    used: 0,
    remaining: DAILY_LIMIT
  }
}