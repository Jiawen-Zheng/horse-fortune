<template>
  <div class="shake-page">
    <!-- 背景粒子效果 -->
    <div class="particles">
      <div v-for="i in 20" :key="i" class="particle"></div>
    </div>

    <!-- 主要内容 -->
    <div class="content">
      <!-- 标题 -->
      <div class="title-section">
        <h2 class="title">{{ shakeStatus.title }}</h2>
        <p class="subtitle">{{ shakeStatus.subtitle }}</p>
      </div>

      <!-- 签筒动画 - 可点击 -->
      <div
        class="sign-tube-container"
        :class="{ shaking: isShaking, clickable: !isShaking && !isCompleted }"
        @click="handleTubeClick"
      >
        <div class="sign-tube">
          <div class="tube-top"></div>
          <div class="tube-body">
            <div
              v-for="i in 5"
              :key="i"
              class="sign-stick"
              :style="{ animationDelay: `${i * 0.1}s` }"
            ></div>
          </div>
        </div>
        
      </div>

      <!-- 进度条 -->
      <div v-if="isShaking" class="progress-section">
        <div class="progress-bar">
          <div class="progress-fill" :style="{ width: `${progress}%` }"></div>
        </div>
        <p class="progress-text">{{ progress }}%</p>
      </div>

      <!-- 操作按钮 - 只显示查看签文 -->
      <div class="action-buttons">
        <button
          v-if="isCompleted"
          class="result-button"
          @click="viewResult"
        >
          <span>查看签文</span>
          <span class="button-icon">✨</span>
        </button>
      </div>

      <!-- 提示文字 -->
      <div class="tip-text">
        <p v-if="!isShaking && !isCompleted">诚心祈愿，心诚则灵</p>
        <p v-if="isShaking">正在为您抽取签文...</p>
        <p v-if="isCompleted">恭喜！已为您抽到一支好签</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { useFortuneStore } from '@/stores/fortune'
import { calculateSignId } from '@/utils/algorithm'

const router = useRouter()
const userStore = useUserStore()
const fortuneStore = useFortuneStore()

const isShaking = ref(false)
const isCompleted = ref(false)
const progress = ref(0)
let progressInterval = null

const shakeStatus = computed(() => {
  if (isCompleted.value) {
    return {
      title: '抽签完成',
      subtitle: '您的签文已准备好'
    }
  }
  if (isShaking.value) {
    return {
      title: '正在抽签',
      subtitle: '请稍候...'
    }
  }
  return {
    title: '开始抽签',
    subtitle: '点击签筒开始抽签'
  }
})

const handleTubeClick = () => {
  if (!isShaking.value && !isCompleted.value) {
    startShake()
  }
}

const startShake = () => {
  if (isShaking.value || isCompleted.value) return

  isShaking.value = true
  progress.value = 0

  // 震动反馈
  if (navigator.vibrate) {
    navigator.vibrate(200)
  }

  // 模拟进度
  progressInterval = setInterval(() => {
    if (progress.value < 100) {
      progress.value += 2
    } else {
      clearInterval(progressInterval)
      completeShake()
    }
  }, 50)
}

const completeShake = () => {
  isShaking.value = false
  isCompleted.value = true

  // 计算签号 - 使用新的参数
  const userInfo = userStore.userInfo
  const signId = calculateSignId(
    userInfo.nickname,
    userInfo.luckyNumber,
    userInfo.luckyColor
  )

  // 保存签号
  fortuneStore.setSignId(signId)

  // 震动反馈
  if (navigator.vibrate) {
    navigator.vibrate([100, 50, 100])
  }
}

const viewResult = () => {
  // 跳转到结果页面
  router.push('/result')
}

onUnmounted(() => {
  if (progressInterval) {
    clearInterval(progressInterval)
  }
})
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

.shake-page {
  position: relative;
  min-height: 100vh;
  background: linear-gradient(180deg, #C62828 0%, #D32F2F 50%, #E53935 100%);
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: $spacing-lg;
}

// 粒子效果
.particles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.particle {
  position: absolute;
  width: 4px;
  height: 4px;
  background: rgba(255, 215, 0, 0.6);
  border-radius: 50%;
  animation: float-particle 10s infinite ease-in-out;

  @for $i from 1 through 20 {
    &:nth-child(#{$i}) {
      left: random(100) * 1%;
      top: random(100) * 1%;
      animation-delay: random(5) * 1s;
      animation-duration: (8 + random(4)) * 1s;
    }
  }
}

@keyframes float-particle {
  0%, 100% {
    transform: translateY(0) scale(1);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  50% {
    transform: translateY(-100px) scale(1.5);
  }
}

// 主要内容
.content {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

// 标题区域
.title-section {
  text-align: center;
  margin-bottom: $spacing-3xl;
}

.title {
  font-size: $font-size-3xl;
  font-family: $font-family-title;
  font-weight: bold;
  color: white;
  margin: 0 0 $spacing-sm 0;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

.subtitle {
  font-size: $font-size-base;
  color: rgba(255, 255, 255, 0.8);
  margin: 0;
}

// 签筒容器 - 放大并可点击
.sign-tube-container {
  position: relative;
  margin: $spacing-3xl 0;
  transition: transform $transition-base;
  cursor: default;

  &.clickable {
    cursor: pointer;
    
    &:hover {
      transform: scale(1.05);
      
      .sign-tube {
        box-shadow: 0 12px 24px rgba(0, 0, 0, 0.5);
      }
    }
    
    &:active {
      transform: scale(0.98);
    }
  }

  &.shaking {
    animation: shake-tube 0.5s infinite;
    cursor: default;
  }
}

@keyframes shake-tube {
  0%, 100% {
    transform: translateX(0) rotate(0deg);
  }
  25% {
    transform: translateX(-10px) rotate(-5deg);
  }
  75% {
    transform: translateX(10px) rotate(5deg);
  }
}

.sign-tube {
  position: relative;
  width: 200px;
  height: 260px;
  transition: box-shadow $transition-base;
}

.tube-top {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 160px;
  height: 40px;
  background: linear-gradient(180deg, #8B4513 0%, #654321 100%);
  border-radius: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);

  &::before {
    content: '籤';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: $gold-color;
    font-size: $font-size-2xl;
    font-weight: bold;
  }
}

.tube-body {
  position: absolute;
  top: 30px;
  left: 50%;
  transform: translateX(-50%);
  width: 180px;
  height: 230px;
  background: linear-gradient(180deg, #8B4513 0%, #654321 100%);
  border-radius: 0 0 90px 90px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: 40px;
  gap: 8px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.4);
}

.sign-stick {
  width: 12px;
  height: 130px;
  background: linear-gradient(180deg, #F5DEB3 0%, #DEB887 100%);
  border-radius: 6px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  animation: stick-wave 1s infinite ease-in-out;
}

@keyframes stick-wave {
  0%, 100% {
    transform: translateY(0) rotate(-2deg);
  }
  50% {
    transform: translateY(-10px) rotate(2deg);
  }
}

// 进度条
.progress-section {
  width: 100%;
  max-width: 300px;
  margin: $spacing-xl 0;
}

.progress-bar {
  width: 100%;
  height: 8px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: $spacing-sm;
}

.progress-fill {
  height: 100%;
  background: $gradient-gold;
  border-radius: 4px;
  transition: width 0.3s ease;
}

.progress-text {
  text-align: center;
  color: white;
  font-size: $font-size-lg;
  font-weight: bold;
  margin: 0;
}

// 操作按钮
.action-buttons {
  margin: $spacing-xl 0;
}

.shake-button,
.result-button {
  padding: $spacing-lg $spacing-3xl;
  background: $gradient-gold;
  color: $text-black;
  border: none;
  border-radius: $border-radius-full;
  font-size: $font-size-lg;
  font-weight: bold;
  cursor: pointer;
  box-shadow: $shadow-lg;
  display: flex;
  align-items: center;
  gap: $spacing-sm;
  transition: all $transition-base;

  &:hover {
    transform: translateY(-2px);
    box-shadow: $shadow-xl;
  }

  &:active {
    transform: translateY(0);
  }

  .button-icon {
    font-size: $font-size-xl;
  }
}

.result-button {
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

// 提示文字
.tip-text {
  text-align: center;
  margin-top: $spacing-xl;

  p {
    color: rgba(255, 255, 255, 0.9);
    font-size: $font-size-base;
    font-family: $font-family-poem;
    margin: 0;
    letter-spacing: 2px;
  }
}

// 响应式设计
@media (max-width: $breakpoint-sm) {
  .title {
    font-size: $font-size-2xl;
  }

  .sign-tube {
    width: 160px;
    height: 210px;
  }

  .tube-top {
    width: 130px;
    height: 35px;
    
    &::before {
      font-size: $font-size-xl;
    }
  }

  .tube-body {
    width: 150px;
    height: 180px;
    padding-top: 35px;
  }

  .sign-stick {
    width: 10px;
    height: 110px;
  }
  
}
</style>