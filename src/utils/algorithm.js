/**
 * 签文匹配算法
 * 根据用户输入计算签号和签等级
 */

/**
 * 计算字符串的数值
 * @param {string} str - 输入字符串
 * @returns {number} 数值
 */
function getStringValue(str) {
  if (!str) return 0
  return Array.from(str).reduce((sum, char) => sum + char.charCodeAt(0), 0)
}

/**
 * 获取颜色的权重值
 * @param {string} color - 颜色
 * @returns {number} 权重值
 */
function getColorValue(color) {
  const colorMap = {
    red: 10,
    gold: 20,
    orange: 30,
    yellow: 40,
    green: 50,
    cyan: 60,
    blue: 70,
    purple: 80,
    pink: 90,
    brown: 100,
    white: 110,
    black: 120
  }
  return colorMap[color] || 0
}

/**
 * 根据用户输入计算签号 - 优化的时间因子算法
 * @param {string} nickname - 用户昵称
 * @param {number} luckyNumber - 幸运数字 (0-100)
 * @param {string} luckyColor - 幸运色
 * @returns {number} 签号 (1-200)
 */
export function calculateSignId(nickname, luckyNumber, luckyColor) {
  // 昵称转数值
  const nicknameValue = getStringValue(nickname)
  
  // 颜色权重
  const colorValue = getColorValue(luckyColor)
  
  // 时间因子 - 结合年月日时
  const now = new Date()
  const year = now.getFullYear()
  const month = now.getMonth() + 1
  const day = now.getDate()
  const hour = now.getHours()
  
  // 计算时辰（传统12时辰）
  const timeSlot = Math.floor((hour + 1) / 2) % 12
  
  // 综合时间因子
  const timeFactor = (year % 100) * 1000 + month * 100 + day * 10 + timeSlot
  
  // 综合计算 - 使用更复杂的算法确保分布均匀
  // 各因素权重：昵称(11) + 幸运数字(19) + 颜色(17) + 时间(23)
  // 修改为生成 1-200 的签号
  const seed = (
    nicknameValue * 11 +
    parseInt(luckyNumber) * 19 +
    colorValue * 17 +
    timeFactor * 23
  ) % 200
  
  // 确保返回 1-200 之间的数字
  return seed === 0 ? 200 : seed
}

/**
 * 根据签号获取签等级
 * @param {number} signId - 签号 (1-200)
 * @returns {string} 'supreme' (上上签) | 'excellent' (上签)
 */
export function getSignLevel(signId) {
  // 1-100 为上上签，101-200 为上签
  return signId <= 100 ? 'supreme' : 'excellent'
}

/**
 * 获取签等级的中文名称
 * @param {string} level - 签等级
 * @returns {string} 中文名称
 */
export function getSignLevelName(level) {
  const levelMap = {
    supreme: '上上签',
    excellent: '上签'
  }
  return levelMap[level] || '上签'
}

/**
 * 获取签等级的星级
 * @param {string} level - 签等级
 * @returns {string} 星级显示
 */
export function getSignLevelStars(level) {
  const starsMap = {
    supreme: '⭐⭐',
    excellent: '⭐'
  }
  return starsMap[level] || '⭐'
}

/**
 * 获取签类的中文名称
 * @param {string} signType - 签类型
 * @returns {string} 中文名称
 */
export function getSignTypeName(signType) {
  const typeMap = {
    fortune: '马年好运签',
    career: '马年事业签',
    study: '马年学业签',
    health: '马年健康签',
    love: '马年爱情签',
    wealth: '马年财运签'
  }
  return typeMap[signType] || '马年好运签'
}

/**
 * 获取签类的描述
 * @param {string} signType - 签类型
 * @returns {string} 描述
 */
export function getSignTypeDescription(signType) {
  const descMap = {
    fortune: '测一测2026马年综合运势',
    career: '职场发展，事业运势',
    study: '学习进步，考试运势',
    health: '身体健康，养生建议',
    love: '感情运势，桃花运',
    wealth: '财富运势，投资理财'
  }
  return descMap[signType] || '测一测2026马年运势'
}

/**
 * 获取签类的图标
 * @param {string} signType - 签类型
 * @returns {string} 图标emoji
 */
export function getSignTypeIcon(signType) {
  const iconMap = {
    fortune: '🐴',
    career: '💼',
    study: '📚',
    health: '💪',
    love: '💕',
    wealth: '💰'
  }
  return iconMap[signType] || '🐴'
}