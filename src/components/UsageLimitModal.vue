<template>
  <div v-if="show" class="modal-overlay" @click="handleClose">
    <div class="modal-content" @click.stop>
      <!-- 关闭按钮 -->
      <button class="close-button" @click="handleClose">×</button>
      
      <!-- 提示内容 -->
      <div class="modal-body">
        <div class="icon">⚠️</div>
        <h3 class="title">今日使用次数已用完</h3>
        <p class="message">您今天已使用 10/10 次</p>
        <p class="tip">明天再来免费使用！</p>
        
        <!-- 分隔线 -->
        <div class="divider"></div>
        
        <!-- 小红书店铺推广 -->
        <div class="shop-promo">
          <div class="shop-header">
            <span class="shop-icon">🌟</span>
            <span class="shop-title">更多精彩内容</span>
          </div>
          
          <div class="shop-card">
            <div class="shop-info">
              <div class="shop-avatar">
                <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Cdefs%3E%3ClinearGradient id='grad1' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23FFD700;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%23FFA500;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Ccircle cx='100' cy='100' r='100' fill='url(%23grad1)'/%3E%3Ctext x='100' y='130' font-size='80' text-anchor='middle' fill='white' font-weight='bold'%3E灵%3C/text%3E%3C/svg%3E" alt="灵光信栈">
              </div>
              <div class="shop-details">
                <h4 class="shop-name">灵光信栈</h4>
                <p class="shop-desc">小红书店铺 · 这里有更多好玩的小工具后续更新！</p>
              </div>
            </div>
            
            <button class="copy-button" @click="copyShopName">
              <span class="button-icon">📋</span>
              <span>复制店铺名</span>
            </button>
          </div>
          
          <p class="shop-tip">复制后在小红书搜索即可找到我们 ✨</p>
        </div>
      </div>
      
      <!-- 底部按钮 -->
      <div class="modal-footer">
        <button class="confirm-button" @click="handleClose">知道了</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  show: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['close'])

const handleClose = () => {
  emit('close')
}

const copyShopName = async () => {
  const shopName = '灵光信栈'
  
  try {
    // 尝试使用现代 API
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(shopName)
      alert('✅ 已复制店铺名称：灵光信栈\n\n请打开小红书搜索即可找到我们！')
    } else {
      // 降级方案：使用传统方法
      const textarea = document.createElement('textarea')
      textarea.value = shopName
      textarea.style.position = 'fixed'
      textarea.style.opacity = '0'
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
      alert('✅ 已复制店铺名称：灵光信栈\n\n请打开小红书搜索即可找到我们！')
    }
  } catch (err) {
    // 如果复制失败，显示店铺名让用户手动复制
    alert('店铺名称：灵光信栈\n\n请手动复制后在小红书搜索')
  }
}
</script>

<style lang="scss" scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 20px;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.modal-content {
  background: white;
  border-radius: 16px;
  max-width: 400px;
  width: 100%;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  position: relative;
  animation: slideUp 0.3s ease;
  max-height: 90vh;
  overflow-y: auto;
}

@keyframes slideUp {
  from {
    transform: translateY(50px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.close-button {
  position: absolute;
  top: 12px;
  right: 12px;
  width: 32px;
  height: 32px;
  border: none;
  background: rgba(0, 0, 0, 0.05);
  border-radius: 50%;
  font-size: 24px;
  color: #666;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  
  &:hover {
    background: rgba(0, 0, 0, 0.1);
    transform: rotate(90deg);
  }
}

.modal-body {
  padding: 32px 24px 24px;
  text-align: center;
}

.icon {
  font-size: 48px;
  margin-bottom: 16px;
}

.title {
  font-size: 20px;
  font-weight: bold;
  color: #333;
  margin: 0 0 8px 0;
}

.message {
  font-size: 16px;
  color: #666;
  margin: 0 0 8px 0;
}

.tip {
  font-size: 14px;
  color: #999;
  margin: 0;
}

.divider {
  height: 1px;
  background: linear-gradient(90deg, transparent 0%, #e0e0e0 50%, transparent 100%);
  margin: 24px 0;
}

.shop-promo {
  text-align: center;
}

.shop-header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-bottom: 16px;
}

.shop-icon {
  font-size: 20px;
}

.shop-title {
  font-size: 16px;
  font-weight: 600;
  color: #333;
}

.shop-card {
  background: linear-gradient(135deg, #FFF9E6 0%, #FFE8CC 100%);
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 12px;
  border: 2px solid #FFD700;
}

.shop-info {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}

.shop-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
  box-shadow: 0 2px 8px rgba(255, 215, 0, 0.3);
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.shop-details {
  flex: 1;
  text-align: left;
}

.shop-name {
  font-size: 18px;
  font-weight: bold;
  color: #D32F2F;
  margin: 0 0 4px 0;
}

.shop-desc {
  font-size: 13px;
  color: #666;
  margin: 0;
}

.copy-button {
  width: 100%;
  padding: 10px 16px;
  background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  transition: all 0.2s;
  box-shadow: 0 2px 8px rgba(255, 165, 0, 0.3);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(255, 165, 0, 0.4);
  }
  
  &:active {
    transform: translateY(0);
  }
}

.button-icon {
  font-size: 16px;
}

.shop-tip {
  font-size: 12px;
  color: #999;
  margin: 0;
}

.modal-footer {
  padding: 0 24px 24px;
}

.confirm-button {
  width: 100%;
  padding: 12px;
  background: linear-gradient(135deg, #D32F2F 0%, #E53935 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(211, 47, 47, 0.3);
  }
  
  &:active {
    transform: translateY(0);
  }
}

// 响应式设计
@media (max-width: 480px) {
  .modal-content {
    max-width: 100%;
    margin: 0 16px;
  }
  
  .modal-body {
    padding: 24px 16px 16px;
  }
  
  .title {
    font-size: 18px;
  }
  
  .shop-name {
    font-size: 16px;
  }
}
</style>