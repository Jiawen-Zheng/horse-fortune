/**
 * 摇签检测工具
 * 检测设备的摇动动作
 */

export class ShakeDetector {
  constructor(callback, threshold = 15) {
    this.callback = callback
    this.threshold = threshold
    this.lastTime = 0
    this.lastX = 0
    this.lastY = 0
    this.lastZ = 0
    this.isShaking = false
    this.shakeTimeout = null
  }

  /**
   * 开始监听摇动
   */
  start() {
    if (window.DeviceMotionEvent) {
      window.addEventListener('devicemotion', this.handleMotion.bind(this))
    } else {
      console.warn('设备不支持DeviceMotionEvent')
    }
  }

  /**
   * 停止监听摇动
   */
  stop() {
    window.removeEventListener('devicemotion', this.handleMotion.bind(this))
    if (this.shakeTimeout) {
      clearTimeout(this.shakeTimeout)
    }
  }

  /**
   * 处理设备运动事件
   */
  handleMotion(event) {
    const current = event.accelerationIncludingGravity
    const currentTime = new Date().getTime()

    // 限制检测频率
    if (currentTime - this.lastTime > 100) {
      const diffTime = currentTime - this.lastTime
      this.lastTime = currentTime

      const x = current.x || 0
      const y = current.y || 0
      const z = current.z || 0

      // 计算加速度变化
      const speed =
        Math.abs(x + y + z - this.lastX - this.lastY - this.lastZ) /
        diffTime *
        10000

      // 检测是否超过阈值
      if (speed > this.threshold && !this.isShaking) {
        this.isShaking = true
        this.triggerShake()

        // 防止短时间内重复触发
        this.shakeTimeout = setTimeout(() => {
          this.isShaking = false
        }, 1000)
      }

      this.lastX = x
      this.lastY = y
      this.lastZ = z
    }
  }

  /**
   * 触发摇动回调
   */
  triggerShake() {
    // 震动反馈
    this.vibrate()
    
    // 执行回调
    if (this.callback && typeof this.callback === 'function') {
      this.callback()
    }
  }

  /**
   * 震动反馈
   */
  vibrate(duration = 200) {
    if (navigator.vibrate) {
      navigator.vibrate(duration)
    } else if (navigator.webkitVibrate) {
      navigator.webkitVibrate(duration)
    }
  }

  /**
   * 请求设备运动权限（iOS 13+需要）
   */
  static async requestPermission() {
    if (typeof DeviceMotionEvent !== 'undefined' && 
        typeof DeviceMotionEvent.requestPermission === 'function') {
      try {
        const permission = await DeviceMotionEvent.requestPermission()
        return permission === 'granted'
      } catch (error) {
        console.error('请求设备运动权限失败:', error)
        return false
      }
    }
    // 非iOS设备或旧版本iOS，默认允许
    return true
  }
}

/**
 * 检查是否支持摇签功能
 */
export function isShakeSupported() {
  return typeof DeviceMotionEvent !== 'undefined'
}

/**
 * 获取设备类型
 */
export function getDeviceType() {
  const ua = navigator.userAgent
  if (/(iPhone|iPad|iPod|iOS)/i.test(ua)) {
    return 'ios'
  } else if (/(Android)/i.test(ua)) {
    return 'android'
  } else {
    return 'other'
  }
}