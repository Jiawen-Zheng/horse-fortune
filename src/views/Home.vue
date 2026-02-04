<template>
  <div class="home-page">
    <!-- 背景装饰 -->
    <div class="bg-decoration">
      <div class="cloud cloud-1"></div>
      <div class="cloud cloud-2"></div>
      <div class="cloud cloud-3"></div>
    </div>

    <!-- 主要内容 -->
    <div class="content">
      <!-- 顶部装饰 -->
      <div class="top-decoration">
        <div class="lantern lantern-left"></div>
        <div class="lantern lantern-right"></div>
      </div>

      <!-- 标题区域 -->
      <div class="title-section">
        <h1 class="main-title">
          <span class="year-text">2026</span>
          <span class="title-text">马年好运签</span>
        </h1>
        <p class="subtitle">测一测您的马年运势</p>
      </div>

      <!-- 祝福语区域 -->
      <div class="blessing-section">
        <div class="blessing-card">
          <div class="blessing-icon">🎊</div>
          <h2 class="blessing-text">祝您新年快乐！</h2>
          <h3 class="blessing-sub">马到成功 · 万事如意</h3>
          <div class="blessing-stars">
            <span class="star">✨</span>
            <span class="star">✨</span>
            <span class="star">✨</span>
          </div>
        </div>
      </div>

     
      <!-- 功能介绍 -->
      <div class="features">
        <div class="feature-item">
          <span class="feature-icon">🎯</span>
          <span class="feature-text">6种签类</span>
        </div>
        <div class="feature-item">
          <span class="feature-icon">📝</span>
          <span class="feature-text">千支签文</span>
        </div>
        <div class="feature-item">
          <span class="feature-icon">🎉</span>
          <span class="feature-text">摇签抽运</span>
        </div>
      </div>

      <!-- 使用说明 -->
      <div class="guide-section">
        <h3 class="guide-title">📋 使用说明</h3>
        <div class="guide-steps">
          <div class="guide-step">
            <div class="step-number">1</div>
            <div class="step-content">
              <h4>选择签类</h4>
              <p>选择您想要测试的运势类型</p>
            </div>
          </div>
          <div class="guide-step">
            <div class="step-number">2</div>
            <div class="step-content">
              <h4>填写信息</h4>
              <p>输入您的昵称和喜好</p>
            </div>
          </div>
          <div class="guide-step">
            <div class="step-number">3</div>
            <div class="step-content">
              <h4>诚心摇签</h4>
              <p>诚心祈愿，获取您的签文</p>
            </div>
          </div>
        </div>
      </div>

  
      <!-- 开始按钮 -->
      <div class="action-section">
        <button class="start-button" @click="handleStart">
          <span class="button-text">开始测运</span>
          <span class="button-icon">→</span>
        </button>
        <p class="tip-text">诚心祈愿，马到成功</p>
      </div>

      <!-- 底部装饰 -->
      <div class="bottom-decoration">
        <div class="wave"></div>
      </div>
    </div>

    <!-- 福字装饰 -->
    <div class="fu-decoration">福</div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const handleStart = () => {
  router.push('/sign-select')
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

// 使用次数提示
.usage-tip {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  background: linear-gradient(135deg, #FFF9E6 0%, #FFE8CC 100%);
  border-radius: 12px;
  margin-bottom: 20px;
  border-left: 4px solid #FFB800;
  box-shadow: 0 2px 8px rgba(255, 184, 0, 0.1);
  width: 100%;
  max-width: 500px;
}

.tip-icon {
  font-size: 20px;
  flex-shrink: 0;
}

.tip-text {
  font-size: 14px;
  color: #666;
  line-height: 1.5;
  flex: 1;
}

.home-page {
  position: relative;
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(180deg, #FFF5F5 0%, #FFEBEE 50%, #FFCDD2 100%);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: $spacing-lg;
}

// 背景装饰
.bg-decoration {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
}

.cloud {
  position: absolute;
  width: 100px;
  height: 40px;
  background: rgba(255, 255, 255, 0.6);
  border-radius: 50px;
  animation: float 20s infinite ease-in-out;

  &::before,
  &::after {
    content: '';
    position: absolute;
    background: rgba(255, 255, 255, 0.6);
    border-radius: 50%;
  }

  &::before {
    width: 50px;
    height: 50px;
    top: -25px;
    left: 10px;
  }

  &::after {
    width: 60px;
    height: 60px;
    top: -30px;
    right: 10px;
  }
}

.cloud-1 {
  top: 10%;
  left: -50px;
  animation-delay: 0s;
}

.cloud-2 {
  top: 30%;
  right: -50px;
  animation-delay: 5s;
}

.cloud-3 {
  top: 60%;
  left: -50px;
  animation-delay: 10s;
}

@keyframes float {
  0%, 100% {
    transform: translateX(0) translateY(0);
  }
  25% {
    transform: translateX(100vw) translateY(-20px);
  }
  50% {
    transform: translateX(100vw) translateY(0);
  }
  75% {
    transform: translateX(0) translateY(20px);
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

// 顶部灯笼装饰
.top-decoration {
  position: relative;
  width: 100%;
  height: 60px;
  margin-bottom: $spacing-xl;
}

.lantern {
  position: absolute;
  width: 40px;
  height: 50px;
  background: $gradient-red;
  border-radius: 8px;
  animation: swing 3s infinite ease-in-out;

  &::before {
    content: '福';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: $gold-color;
    font-size: 20px;
    font-weight: bold;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 20px;
    height: 10px;
    background: $gold-color;
    border-radius: 0 0 10px 10px;
  }
}

.lantern-left {
  left: 20px;
  animation-delay: 0s;
}

.lantern-right {
  right: 20px;
  animation-delay: 1.5s;
}

@keyframes swing {
  0%, 100% {
    transform: rotate(-5deg);
  }
  50% {
    transform: rotate(5deg);
  }
}

// 标题区域
.title-section {
  text-align: center;
  margin-bottom: $spacing-2xl;
}

.main-title {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: $spacing-sm;
  margin: 0;
}

.year-text {
  font-size: $font-size-xl;
  color: $primary-color;
  font-weight: 600;
  letter-spacing: 4px;
}

.title-text {
  font-size: $font-size-4xl;
  font-family: $font-family-title;
  font-weight: bold;
  background: $gradient-red;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: 2px;
  text-shadow: 2px 2px 4px rgba(211, 47, 47, 0.2);
}

.subtitle {
  font-size: $font-size-lg;
  color: $text-gray;
  margin-top: $spacing-sm;
  letter-spacing: 2px;
}

// 祝福语区域
.blessing-section {
  margin: $spacing-3xl 0;
  width: 100%;
}

.blessing-card {
  background: linear-gradient(135deg, #FFD700 0%, #FFA000 100%);
  border-radius: $border-radius-lg;
  padding: $spacing-2xl;
  text-align: center;
  box-shadow: $shadow-xl;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(255, 255, 255, 0.3) 0%, transparent 70%);
    animation: glow-pulse 3s infinite;
  }
}

.blessing-icon {
  font-size: 60px;
  margin-bottom: $spacing-base;
  animation: bounce-slow 2s infinite;
}

.blessing-text {
  font-size: $font-size-3xl;
  font-family: $font-family-title;
  font-weight: bold;
  color: white;
  margin: $spacing-sm 0;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  position: relative;
  z-index: 1;
}

.blessing-sub {
  font-size: $font-size-lg;
  font-family: $font-family-poem;
  color: rgba(255, 255, 255, 0.95);
  margin: $spacing-sm 0;
  letter-spacing: 3px;
  position: relative;
  z-index: 1;
}

.blessing-stars {
  display: flex;
  justify-content: center;
  gap: $spacing-base;
  margin-top: $spacing-base;
  
  .star {
    font-size: 24px;
    animation: twinkle 1.5s infinite;
    
    &:nth-child(1) {
      animation-delay: 0s;
    }
    
    &:nth-child(2) {
      animation-delay: 0.5s;
    }
    
    &:nth-child(3) {
      animation-delay: 1s;
    }
  }
}

@keyframes glow-pulse {
  0%, 100% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 0.5;
  }
  50% {
    transform: translate(-50%, -50%) scale(1.1);
    opacity: 0.8;
  }
}

@keyframes bounce-slow {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

@keyframes twinkle {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.5;
    transform: scale(0.8);
  }
}

// 马的图标装饰
.horse-icon {
  position: relative;
  margin: $spacing-2xl 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.horse-emoji {
  font-size: 100px;
  filter: drop-shadow(0 8px 16px rgba(0, 0, 0, 0.15));
  animation: float-gentle 3s infinite ease-in-out;
  position: relative;
  z-index: 1;
}

.horse-glow {
  position: absolute;
  width: 150px;
  height: 150px;
  background: radial-gradient(circle, rgba(255, 215, 0, 0.4) 0%, transparent 70%);
  border-radius: 50%;
  animation: glow-expand 2s infinite;
}

@keyframes float-gentle {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-15px);
  }
}

@keyframes glow-expand {
  0%, 100% {
    transform: scale(1);
    opacity: 0.6;
  }
  50% {
    transform: scale(1.2);
    opacity: 0.3;
  }
}

// 签筒装饰
.sign-container {
  margin: $spacing-xl 0;
}

.sign-tube {
  position: relative;
  width: 120px;
  height: 150px;
  background: linear-gradient(180deg, #8B4513 0%, #654321 100%);
  border-radius: 0 0 60px 60px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: 20px;
  gap: 8px;
  box-shadow: $shadow-lg;

  &::before {
    content: '';
    position: absolute;
    top: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 20px;
    background: #654321;
    border-radius: 10px;
  }
}

.sign-stick {
  width: 8px;
  height: 80px;
  background: linear-gradient(180deg, #F5DEB3 0%, #DEB887 100%);
  border-radius: 4px;
  animation: shake 0.5s infinite alternate;

  &:nth-child(1) {
    animation-delay: 0s;
  }

  &:nth-child(2) {
    animation-delay: 0.1s;
  }

  &:nth-child(3) {
    animation-delay: 0.2s;
  }
}

@keyframes shake {
  0% {
    transform: translateY(0) rotate(-2deg);
  }
  100% {
    transform: translateY(-5px) rotate(2deg);
  }
}

// 功能介绍
.features {
  display: flex;
  justify-content: center;
  gap: $spacing-2xl;
  margin: $spacing-2xl 0;
}

.feature-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: $spacing-sm;
}

.feature-icon {
  font-size: 32px;
}

.feature-text {
  font-size: $font-size-sm;
  color: $text-gray;
  white-space: nowrap;
}

// 使用说明
.guide-section {
  width: 100%;
  margin: $spacing-3xl 0;
  background: white;
  border-radius: $border-radius-lg;
  padding: $spacing-xl;
  box-shadow: $shadow-base;
}

.guide-title {
  text-align: center;
  font-size: $font-size-xl;
  font-family: $font-family-title;
  font-weight: bold;
  color: $primary-color;
  margin: 0 0 $spacing-xl 0;
}

.guide-steps {
  display: flex;
  flex-direction: column;
  gap: $spacing-lg;
}

.guide-step {
  display: flex;
  align-items: center;
  gap: $spacing-base;
  padding: $spacing-base;
  background: linear-gradient(135deg, #FFF5F5 0%, #FFEBEE 100%);
  border-radius: $border-radius-sm;
  transition: all $transition-base;

  &:hover {
    transform: translateX(5px);
    box-shadow: $shadow-sm;
  }
}

.step-number {
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  background: $gradient-red;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: $font-size-lg;
  font-weight: bold;
  box-shadow: $shadow-sm;
}

.step-content {
  flex: 1;

  h4 {
    font-size: $font-size-base;
    font-weight: 600;
    color: $text-black;
    margin: 0 0 $spacing-xs 0;
  }

  p {
    font-size: $font-size-sm;
    color: $text-gray;
    margin: 0;
  }
}

// 新年祝福语
.wishes-section {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: $spacing-base;
  width: 100%;
  margin: $spacing-2xl 0;
}

.wish-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: $spacing-sm;
  padding: $spacing-lg;
  background: linear-gradient(135deg, #FFD700 0%, #FFA000 100%);
  border-radius: $border-radius-base;
  box-shadow: $shadow-base;
  transition: all $transition-base;

  &:hover {
    transform: translateY(-5px);
    box-shadow: $shadow-lg;
  }
}

.wish-icon {
  font-size: 32px;
  animation: bounce-gentle 2s infinite;
}

.wish-text {
  font-size: $font-size-base;
  font-family: $font-family-title;
  font-weight: bold;
  color: white;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
}

@keyframes bounce-gentle {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
}

// 开始按钮
.action-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: $spacing-base;
  margin-top: $spacing-2xl;
  position: relative;
  z-index: 10;
}

.start-button {
  position: relative;
  padding: $spacing-base $spacing-3xl;
  background: $gradient-red;
  color: white;
  border: none;
  border-radius: $border-radius-full;
  font-size: $font-size-xl;
  font-weight: bold;
  cursor: pointer;
  box-shadow: $shadow-lg;
  display: flex;
  align-items: center;
  gap: $spacing-sm;
  transition: all $transition-base;
  overflow: hidden;
  z-index: 10;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    background: rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    transform: translate(-50%, -50%);
    transition: width 0.6s, height 0.6s;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: $shadow-xl;

    &::before {
      width: 300px;
      height: 300px;
    }
  }

  &:active {
    transform: translateY(0);
  }
}

.button-text,
.button-icon {
  position: relative;
  z-index: 1;
}

.button-icon {
  font-size: $font-size-2xl;
  transition: transform $transition-base;
}

.start-button:hover .button-icon {
  transform: translateX(5px);
}

.tip-text {
  font-size: $font-size-sm;
  color: $text-gray;
  font-family: $font-family-poem;
  letter-spacing: 2px;
}

// 底部装饰
.bottom-decoration {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100px;
  overflow: hidden;
}

.wave {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 200%;
  height: 100px;
  background: linear-gradient(180deg, transparent 0%, rgba(211, 47, 47, 0.1) 100%);
  animation: wave 10s linear infinite;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 120'%3E%3Cpath d='M0,50 Q300,0 600,50 T1200,50 L1200,120 L0,120 Z' fill='rgba(211,47,47,0.1)'/%3E%3C/svg%3E");
    background-size: 50% 100%;
    animation: wave 8s linear infinite;
  }
}

@keyframes wave {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

// 福字装饰
.fu-decoration {
  position: absolute;
  top: 50%;
  right: -50px;
  transform: translateY(-50%) rotate(15deg);
  font-size: 150px;
  font-family: $font-family-title;
  font-weight: bold;
  color: rgba(211, 47, 47, 0.05);
  pointer-events: none;
  z-index: 0;
}

// 响应式设计
@media (max-width: $breakpoint-sm) {
  .title-text {
    font-size: $font-size-3xl;
  }

  .blessing-text {
    font-size: $font-size-2xl;
  }
  
  .blessing-sub {
    font-size: $font-size-base;
  }
  
  .horse-emoji {
    font-size: 80px;
  }

  .features {
    gap: $spacing-base;
  }

  .feature-icon {
    font-size: 28px;
  }

  .guide-section {
    padding: $spacing-lg;
  }

  .guide-title {
    font-size: $font-size-lg;
  }

  .wishes-section {
    grid-template-columns: 1fr;
  }

  .wish-card {
    padding: $spacing-base;
  }

  .wish-icon {
    font-size: 28px;
  }

  .start-button {
    padding: $spacing-sm $spacing-xl;
    font-size: $font-size-lg;
  }
}
</style>