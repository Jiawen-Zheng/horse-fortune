<template>
  <div class="sign-select-page">
    <!-- 返回按钮 -->
    <div class="header">
      <button class="back-button" @click="goBack">
        <span>←</span>
      </button>
      <h2 class="page-title">选择签类</h2>
      <div class="placeholder"></div>
    </div>

    <!-- 签类列表 -->
    <div class="sign-list">
      <div
        v-for="sign in signTypes"
        :key="sign.type"
        class="sign-card"
        @click="selectSign(sign)"
      >
        <div class="sign-icon">{{ sign.icon }}</div>
        <div class="sign-info">
          <h3 class="sign-name">{{ sign.name }}</h3>
          <p class="sign-desc">{{ sign.description }}</p>
        </div>
        <div class="sign-arrow">→</div>
      </div>
    </div>

    <!-- 底部提示 -->
    <div class="footer-tip">
      <p>选择您最关心的运势</p>
      <p class="sub-tip">以第一次测为准哦，祝您新年愉快！</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useFortuneStore } from '@/stores/fortune'
import { signCategories } from '@/data/index'

const router = useRouter()
const fortuneStore = useFortuneStore()

// 使用新的签类配置
const signTypes = ref(signCategories.map(cat => ({
  type: cat.id,
  name: cat.name,
  icon: cat.icon,
  description: cat.description
})))

const goBack = () => {
  router.back()
}

const selectSign = (sign) => {
  fortuneStore.setSignType(sign.type)
  router.push('/user-info')
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

.sign-select-page {
  min-height: 100vh;
  background: linear-gradient(180deg, #FFF5F5 0%, #FFEBEE 100%);
  padding: $spacing-lg;
  padding-bottom: 100px;
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

  &:active {
    transform: translateX(0);
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

// 签类列表
.sign-list {
  display: flex;
  flex-direction: column;
  gap: $spacing-base;
}

.sign-card {
  background: white;
  border-radius: $border-radius-base;
  padding: $spacing-lg;
  display: flex;
  align-items: center;
  gap: $spacing-base;
  cursor: pointer;
  box-shadow: $shadow-sm;
  transition: all $transition-base;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 100%;
    background: $gradient-red;
    transform: scaleY(0);
    transition: transform $transition-base;
  }

  &:hover {
    transform: translateX(8px);
    box-shadow: $shadow-base;

    &::before {
      transform: scaleY(1);
    }

    .sign-arrow {
      transform: translateX(5px);
    }
  }

  &:active {
    transform: translateX(4px);
  }
}

.sign-icon {
  font-size: 48px;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #FFF5F5 0%, #FFEBEE 100%);
  border-radius: $border-radius-sm;
  flex-shrink: 0;
}

.sign-info {
  flex: 1;
  min-width: 0;
}

.sign-name {
  font-size: $font-size-lg;
  font-weight: bold;
  color: $text-black;
  margin: 0 0 $spacing-xs 0;
}

.sign-desc {
  font-size: $font-size-sm;
  color: $text-gray;
  margin: 0;
}

.sign-arrow {
  font-size: $font-size-xl;
  color: $primary-color;
  transition: transform $transition-base;
  flex-shrink: 0;
}

// 底部提示
.footer-tip {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: white;
  padding: $spacing-lg;
  text-align: center;
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.1);

  p {
    margin: 0;
    font-size: $font-size-base;
    color: $text-black;
    font-family: $font-family-poem;
  }

  .sub-tip {
    margin-top: $spacing-xs;
    font-size: $font-size-sm;
    color: $text-gray;
  }
}

// 响应式设计
@media (max-width: $breakpoint-sm) {
  .sign-icon {
    font-size: 40px;
    width: 50px;
    height: 50px;
  }

  .sign-name {
    font-size: $font-size-base;
  }

  .sign-desc {
    font-size: $font-size-xs;
  }
}
</style>