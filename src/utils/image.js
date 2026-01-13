/**
 * 图片生成工具
 * 使用html2canvas生成分享图片
 */

import html2canvas from 'html2canvas'

/**
 * 生成分享图片
 * @param {HTMLElement} element - 要转换的DOM元素
 * @param {Object} options - 配置选项
 * @returns {Promise<string>} 图片的DataURL
 */
export async function generateShareImage(element, options = {}) {
  const defaultOptions = {
    backgroundColor: '#ffffff',
    scale: 2, // 提高清晰度
    useCORS: true,
    logging: false,
    width: element.offsetWidth,
    height: element.offsetHeight,
    ...options
  }

  try {
    const canvas = await html2canvas(element, defaultOptions)
    return canvas.toDataURL('image/png')
  } catch (error) {
    console.error('生成图片失败:', error)
    throw error
  }
}

/**
 * 下载图片
 * @param {string} dataUrl - 图片的DataURL
 * @param {string} filename - 文件名
 */
export function downloadImage(dataUrl, filename = 'horse-fortune.png') {
  const link = document.createElement('a')
  link.href = dataUrl
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

/**
 * 保存图片到相册（移动端）
 * @param {string} dataUrl - 图片的DataURL
 */
export async function saveToAlbum(dataUrl) {
  try {
    // 将DataURL转换为Blob
    const blob = await dataUrlToBlob(dataUrl)
    
    // 创建临时URL
    const url = URL.createObjectURL(blob)
    
    // 创建下载链接
    const link = document.createElement('a')
    link.href = url
    link.download = `马年好运签_${Date.now()}.png`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    
    // 释放URL
    URL.revokeObjectURL(url)
    
    return true
  } catch (error) {
    console.error('保存图片失败:', error)
    return false
  }
}

/**
 * 将DataURL转换为Blob
 * @param {string} dataUrl - 图片的DataURL
 * @returns {Promise<Blob>}
 */
function dataUrlToBlob(dataUrl) {
  return new Promise((resolve, reject) => {
    const arr = dataUrl.split(',')
    const mime = arr[0].match(/:(.*?);/)[1]
    const bstr = atob(arr[1])
    let n = bstr.length
    const u8arr = new Uint8Array(n)
    
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n)
    }
    
    resolve(new Blob([u8arr], { type: mime }))
  })
}

/**
 * 复制图片到剪贴板
 * @param {string} dataUrl - 图片的DataURL
 */
export async function copyImageToClipboard(dataUrl) {
  try {
    const blob = await dataUrlToBlob(dataUrl)
    const item = new ClipboardItem({ 'image/png': blob })
    await navigator.clipboard.write([item])
    return true
  } catch (error) {
    console.error('复制图片失败:', error)
    return false
  }
}

/**
 * 检查是否支持剪贴板API
 */
export function isClipboardSupported() {
  return navigator.clipboard && typeof navigator.clipboard.write === 'function'
}

/**
 * 预加载图片
 * @param {string} src - 图片地址
 * @returns {Promise<HTMLImageElement>}
 */
export function preloadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = src
  })
}

/**
 * 批量预加载图片
 * @param {string[]} srcs - 图片地址数组
 * @returns {Promise<HTMLImageElement[]>}
 */
export function preloadImages(srcs) {
  return Promise.all(srcs.map(src => preloadImage(src)))
}