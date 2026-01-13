<template>
  <div class="user-info-page">
    <!-- 树叶动画 -->
    <LeafAnimation v-if="showLeafAnimation" @complete="onAnimationComplete" />
    
    <!-- 头部 -->
    <div class="header">
      <button class="back-button" @click="goBack">
        <span>←</span>
      </button>
      <h2 class="page-title">让我们更了解您</h2>
      <div class="placeholder"></div>
    </div>

    <!-- 表单区域 -->
    <div class="form-container">
      <div class="form-card">
        <div class="card-header">
          <div class="icon">✨</div>
        </div>

        <div class="form-content">
          <!-- 昵称选择 -->
          <div class="form-item">
            <label class="form-label">
              <span class="label-icon">👤</span>
              <span>如何称呼您</span>
            </label>
            <input
              v-model="formData.nickname"
              type="text"
              class="form-input"
              placeholder="请输入"
              maxlength="10"
            />
          </div>

          <!-- 幸运数字输入框 -->
          <div class="form-item">
            <label class="form-label">
              <span class="label-icon">🔢</span>
              <span>心里默想一个数字</span>
            </label>
            <input
              v-model.number="formData.luckyNumber"
              type="number"
              min="0"
              max="100"
              class="form-input"
              placeholder="请输入0-100之间的数字"
            />
          </div>

          <!-- 幸运色彩 -->
          <div class="form-item">
            <label class="form-label">
              <span class="label-icon">🎨</span>
              <span>选取一个您认为和此签匹配的颜色</span>
            </label>
            <div class="color-picker">
              <button
                v-for="color in colorOptions"
                :key="color.value"
                class="color-btn"
                :class="{ active: formData.luckyColor === color.value }"
                :style="{ background: color.bg }"
                @click="formData.luckyColor = color.value"
              >
                <span class="color-icon">{{ color.icon }}</span>
                <span class="color-name">{{ color.label }}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- 提交按钮 -->
      <button
        class="submit-button"
        :disabled="!isFormValid"
        @click="handleSubmit"
      >
        <span>开始摇签</span>
        <span class="button-icon">🎲</span>
      </button>

      <!-- 说明文字 -->
      <div class="info-text">
        <p>💡 温馨提示</p>
        <p>请根据您的喜好选择，系统将为您匹配最适合的签文</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import LeafAnimation from '@/components/LeafAnimation.vue'

const router = useRouter()
const userStore = useUserStore()

const showLeafAnimation = ref(false)

// 颜色选项 - 8种颜色（去掉黑色和白色）
const colorOptions = [
  { value: 'red', icon: '🔴', label: '红色', bg: 'linear-gradient(135deg, #FF6B6B 0%, #FF5252 100%)' },
  { value: 'orange', icon: '🟠', label: '橙色', bg: 'linear-gradient(135deg, #FF9800 0%, #F57C00 100%)' },
  { value: 'yellow', icon: '🟨', label: '黄色', bg: 'linear-gradient(135deg, #FFEB3B 0%, #FBC02D 100%)' },
  { value: 'green', icon: '🟢', label: '绿色', bg: 'linear-gradient(135deg, #4CAF50 0%, #388E3C 100%)' },
  { value: 'cyan', icon: '🩵', label: '青色', bg: 'linear-gradient(135deg, #00BCD4 0%, #0097A7 100%)' },
  { value: 'blue', icon: '🔵', label: '蓝色', bg: 'linear-gradient(135deg, #2196F3 0%, #1976D2 100%)' },
  { value: 'purple', icon: '🟣', label: '紫色', bg: 'linear-gradient(135deg, #9C27B0 0%, #7B1FA2 100%)' },
  { value: 'pink', icon: '🩷', label: '粉色', bg: 'linear-gradient(135deg, #E91E63 0%, #C2185B 100%)' }
]

const formData = ref({
  nickname: '',
  luckyNumber: 50,
  luckyColor: ''
})

const isFormValid = computed(() => {
  return (
    formData.value.nickname.trim() !== '' &&
    formData.value.luckyNumber >= 0 &&
    formData.value.luckyNumber <= 100 &&
    formData.value.luckyColor !== ''
  )
})

const goBack = () => {
  router.back()
}

const handleSubmit = () => {
  if (!isFormValid.value) return

  // 保存用户信息
  userStore.setUserInfo({
    nickname: formData.value.nickname.trim(),
    luckyNumber: formData.value.luckyNumber,
    luckyColor: formData.value.luckyColor
  })

  // 显示树叶动画
  showLeafAnimation.value = true
}

const onAnimationComplete = () => {
  // 动画完成后跳转到摇签页
  router.push('/shake')
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

.user-info-page {
  min-height: 100vh;
  background: linear-gradient(180deg, #FFF5F5 0%, #FFEBEE 100%);
  padding: $spacing-lg;
}

// 头部
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: $spacing-2xl;
  padding: $spacing-base 0;
}

.back-button {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  background: white;
  color: $primary-color;
  font-size: $font-size-xl;
  cursor: pointer;
  box-shadow: $shadow-sm;
  transition: all $transition-base;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    transform: translateX(-3px);
    box-shadow: $shadow-base;
  }
}

.page-title {
  font-size: $font-size-2xl;
  font-family: $font-family-title;
  font-weight: bold;
  color: $primary-color;
  margin: 0;
}

.placeholder {
  width: 40px;
}

// 表单容器
.form-container {
  max-width: 500px;
  margin: 0 auto;
}

.form-card {
  background: white;
  border-radius: $border-radius-base;
  padding: $spacing-xl;
  box-shadow: $shadow-base;
  margin-bottom: $spacing-xl;
}

.card-header {
  text-align: center;
  margin-bottom: $spacing-xl;

  .icon {
    font-size: 48px;
  }
}

.form-content {
  display: flex;
  flex-direction: column;
  gap: $spacing-2xl;
}

.form-item {
  display: flex;
  flex-direction: column;
  gap: $spacing-sm;
}

.form-label {
  display: flex;
  align-items: center;
  gap: $spacing-sm;
  font-size: $font-size-base;
  font-weight: 500;
  color: $text-black;

  .label-icon {
    font-size: $font-size-lg;
  }
}

.form-input {
  width: 100%;
  padding: $spacing-base;
  border: 2px solid $border-color;
  border-radius: $border-radius-sm;
  font-size: $font-size-base;
  transition: all $transition-base;
  background: white;

  &:focus {
    outline: none;
    border-color: $primary-color;
    box-shadow: 0 0 0 3px rgba(211, 47, 47, 0.1);
  }

  &::placeholder {
    color: #BDBDBD;
  }
}

// 颜色选择器
.color-picker {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: $spacing-xs;
}

.color-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: $spacing-sm $spacing-xs;
  border: 2px solid transparent;
  border-radius: $border-radius-sm;
  cursor: pointer;
  transition: all $transition-base;
  color: white;

  &:hover {
    transform: translateY(-2px);
    box-shadow: $shadow-base;
  }

  &.active {
    border-color: white;
    box-shadow: $shadow-lg;
    transform: scale(1.05);
  }

  .color-icon {
    font-size: 20px;
  }

  .color-name {
    font-size: 11px;
    font-weight: 600;
  }
}

// 提交按钮
.submit-button {
  width: 100%;
  padding: $spacing-lg;
  background: $gradient-red;
  color: white;
  border: none;
  border-radius: $border-radius-full;
  font-size: $font-size-lg;
  font-weight: bold;
  cursor: pointer;
  box-shadow: $shadow-base;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: $spacing-sm;
  transition: all $transition-base;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: $shadow-lg;
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .button-icon {
    font-size: $font-size-xl;
  }
}

// 说明文字
.info-text {
  text-align: center;
  margin-top: $spacing-xl;
  padding: $spacing-base;
  background: rgba(255, 255, 255, 0.6);
  border-radius: $border-radius-sm;

  p {
    margin: $spacing-xs 0;
    font-size: $font-size-sm;
    color: $text-gray;

    &:first-child {
      font-weight: 600;
      color: $primary-color;
    }
  }
}

// 响应式设计
@media (max-width: $breakpoint-sm) {
  .form-card {
    padding: $spacing-lg;
  }

  .card-header .icon {
    font-size: 40px;
  }

  .color-picker {
    grid-template-columns: repeat(4, 1fr);
  }
}
</style>