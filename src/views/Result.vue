<template>
  <div class="result-page">
    <!-- 背景装饰 -->
    <div class="bg-decoration">
      <div class="firework" v-for="i in 3" :key="i"></div>
    </div>

    <!-- 主要内容 -->
    <div class="content" ref="resultContent">
      <!-- 头部 -->
      <div class="header">
        <button class="back-button" @click="goHome">
          <span>🏠</span>
        </button>
        <h2 class="page-title">签文结果</h2>
        <div class="header-spacer"></div>
      </div>

      <!-- 签文卡片 -->
      <div class="sign-card">
        <!-- 签等级标识 -->
        <div class="sign-level" :class="signLevel">
          <span class="level-text">{{ signLevelText }}</span>
          <div class="level-decoration"></div>
        </div>

        <!-- 签文标题 -->
        <h3 class="sign-title">{{ signData.title }}</h3>

        <!-- 签诗 -->
        <div class="sign-poem">
          <div class="poem-line" v-for="(line, index) in signData.poem" :key="index">
            {{ line }}
          </div>
        </div>

        <!-- 分隔线 -->
        <div class="divider"></div>

        <!-- 签文解释 -->
        <div class="sign-interpretation">
          <h4 class="section-title">
            <span class="title-icon">📖</span>
            <span>签文解释</span>
          </h4>
          <div class="interpretation-text" v-html="formatText(signData.interpretation)"></div>
        </div>

        <!-- 建议 -->
        <div class="sign-advice">
          <h4 class="section-title">
            <span class="title-icon">💡</span>
            <span>温馨建议</span>
          </h4>
          <div class="advice-text" v-html="formatText(signData.advice)"></div>
        </div>

        <!-- 祝福语 -->
        <div class="blessing">
          <p class="blessing-text">{{ blessingMessage }}</p>
        </div>
      </div>

      <!-- 操作按钮 -->
      <div class="action-buttons">
        <button class="action-button primary" @click="drawAgain">
          <span class="button-icon">🔄</span>
          <span>再抽一签</span>
        </button>
      </div>

      <!-- 免责声明 -->
      <div class="disclaimer">
        <p>* 本签文仅供娱乐参考，请理性对待</p>
      </div>
    </div>

    <!-- 使用次数限制弹窗 -->
    <UsageLimitModal :show="showLimitModal" @close="closeLimitModal" />
    
    <!-- 退出提示弹窗 -->
    <ExitPromptModal
      :show="showExitPrompt"
      @confirm="confirmExit"
      @cancel="cancelExit"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useFortuneStore } from '@/stores/fortune'
import { getSignByCategoryAndId } from '@/data/index'
import { checkDailyUsage, getUsageStats } from '@/utils/usageLimit'
import UsageLimitModal from '@/components/UsageLimitModal.vue'
import ExitPromptModal from '@/components/ExitPromptModal.vue'

const router = useRouter()
const fortuneStore = useFortuneStore()
const showLimitModal = ref(false)
const showExitPrompt = ref(false)

// 格式化文本：每个词条换行，【】之前换行
const formatText = (text) => {
  if (!text) return ''
  
  // 1. 在【之前添加换行（如果前面不是开头）
  let formatted = text.replace(/(.+?)(【)/g, '$1<br/>$2')
  
  // 2. 在每个句号、感叹号、问号后添加换行
  formatted = formatted.replace(/([。！？])/g, '$1<br/>')
  
  // 3. 清理多余的连续换行
  formatted = formatted.replace(/(<br\/>){2,}/g, '<br/>')
  
  // 4. 清理开头的换行
  formatted = formatted.replace(/^<br\/>/, '')
  
  return formatted
}

const signId = computed(() => {
  const id = fortuneStore.signId
  if (!id || id < 1 || id > 200) {
    console.warn('签号无效，使用默认值1')
    return 1
  }
  return id
})

const signType = computed(() => fortuneStore.signType || 'fortune')

const signLevel = computed(() => signId.value <= 100 ? 'supreme' : 'excellent')
const signLevelText = computed(() => signLevel.value === 'supreme' ? '上上签' : '上签')

// 根据签类生成祝福语
const blessingMessage = computed(() => {
  const blessings = {
    fortune: '愿您好运常伴，万事如意！🍀',
    career: '祝您事业蒸蒸日上，前程似锦！🌟',
    love: '愿您情路顺遂，幸福美满！💕',
    wealth: '祝您财源广进，富贵吉祥！💰',
    health: '愿您身体健康，平安喜乐！🌈',
    study: '祝您学业有成，金榜题名！📚'
  }
  return blessings[signType.value] || '愿您诸事顺遂，心想事成！✨'
})

// 获取真实签文数据
const signData = computed(() => {
  const data = getSignByCategoryAndId(signType.value, signId.value)
  if (!data) {
    console.error('无法获取签文数据，签类:', signType.value, '签号:', signId.value)
    return getSignByCategoryAndId('fortune', 1) // 返回默认签文
  }
  return data
})

const goHome = () => {
  // 检查是否还有剩余次数
  const { remaining } = getUsageStats()
  
  if (remaining > 0) {
    // 还有剩余次数，显示退出提示
    showExitPrompt.value = true
  } else {
    // 没有剩余次数，直接返回
    router.push('/')
  }
}

const confirmExit = () => {
  showExitPrompt.value = false
  router.push('/')
}

const cancelExit = () => {
  showExitPrompt.value = false
}

const drawAgain = () => {
  // 检查使用次数
  const { allowed } = checkDailyUsage()
  
  if (!allowed) {
    showLimitModal.value = true
    return
  }
  
  // 清除当前签号，重新开始
  fortuneStore.setSignId(null)
  router.push('/sign-select')
}

const closeLimitModal = () => {
  showLimitModal.value = false
}

onMounted(() => {
  console.log('当前签类:', signType.value)
  console.log('当前签号:', signId.value)
  console.log('签文数据:', signData.value)
  
  // 如果没有签号，提示用户重新抽签
  if (!fortuneStore.signId) {
    console.warn('未找到签号，可能需要重新抽签')
  }
})
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

.result-page {
  position: relative;
  min-height: 100vh;
  background: linear-gradient(180deg, #FFF5F5 0%, #FFEBEE 100%);
  overflow: hidden;
  padding: $spacing-lg;
  padding-bottom: 100px;
}

// 背景装饰
.bg-decoration {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  overflow: hidden;
}

.firework {
  position: absolute;
  width: 4px;
  height: 4px;
  background: $gold-color;
  border-radius: 50%;
  animation: firework 3s infinite ease-out;

  &:nth-child(1) {
    top: 20%;
    left: 20%;
    animation-delay: 0s;
  }

  &:nth-child(2) {
    top: 30%;
    right: 20%;
    animation-delay: 1s;
  }

  &:nth-child(3) {
    top: 50%;
    left: 50%;
    animation-delay: 2s;
  }
}

@keyframes firework {
  0% {
    transform: scale(1);
    opacity: 1;
    box-shadow: 0 0 0 0 $gold-color;
  }
  100% {
    transform: scale(20);
    opacity: 0;
    box-shadow: 0 0 50px 20px transparent;
  }
}

// 主要内容
.content {
  max-width: 600px;
  margin: 0 auto;
}

// 头部
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: $spacing-xl;
  padding: $spacing-base 0;
}

.back-button {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: none;
  background: white;
  font-size: $font-size-xl;
  cursor: pointer;
  box-shadow: $shadow-sm;
  transition: all $transition-base;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    transform: translateY(-2px);
    box-shadow: $shadow-base;
  }

  &:active {
    transform: translateY(0);
  }
}

.header-spacer {
  width: 44px;
}

.page-title {
  font-size: $font-size-2xl;
  font-family: $font-family-title;
  font-weight: bold;
  color: $primary-color;
  margin: 0;
}

// 签文卡片
.sign-card {
  background: white;
  border-radius: $border-radius-base;
  padding: $spacing-xl;
  box-shadow: $shadow-lg;
  margin-bottom: $spacing-xl;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: $gradient-red;
  }
}

// 签等级
.sign-level {
  display: inline-flex;
  align-items: center;
  gap: $spacing-sm;
  padding: $spacing-sm $spacing-base;
  border-radius: $border-radius-full;
  margin-bottom: $spacing-base;
  position: relative;

  &.supreme {
    background: linear-gradient(135deg, #FFD700 0%, #FFA000 100%);
    color: white;
  }

  &.excellent {
    background: linear-gradient(135deg, #FF6B6B 0%, #FF5252 100%);
    color: white;
  }
}

.level-text {
  font-size: $font-size-sm;
  font-weight: bold;
  position: relative;
  z-index: 1;
}

.level-decoration {
  position: absolute;
  top: 50%;
  right: -10px;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  background: inherit;
  border-radius: 50%;
  opacity: 0.5;
}

// 签文标题
.sign-title {
  text-align: center;
  font-size: $font-size-2xl;
  font-family: $font-family-title;
  font-weight: bold;
  color: $primary-color;
  margin: $spacing-lg 0;
}

// 签诗
.sign-poem {
  background: linear-gradient(135deg, #FFF5F5 0%, #FFEBEE 100%);
  border-radius: $border-radius-sm;
  padding: $spacing-lg;
  margin: $spacing-lg 0;
  border-left: 4px solid $primary-color;
}

.poem-line {
  font-size: $font-size-lg;
  font-family: $font-family-poem;
  color: $text-black;
  line-height: 2;
  text-align: center;
  letter-spacing: 2px;
}

// 分隔线
.divider {
  height: 1px;
  background: linear-gradient(90deg, transparent 0%, $border-color 50%, transparent 100%);
  margin: $spacing-xl 0;
}

// 签文解释和建议
.sign-interpretation,
.sign-advice {
  margin: $spacing-lg 0;
}

.section-title {
  display: flex;
  align-items: center;
  gap: $spacing-sm;
  font-size: $font-size-lg;
  font-weight: bold;
  color: $text-black;
  margin: 0 0 $spacing-base 0;
}

.title-icon {
  font-size: $font-size-xl;
}

.interpretation-text,
.advice-text {
  font-size: $font-size-sm;
  color: $text-gray;
  line-height: 1.8;
  margin: 0;
  text-align: justify;
}

// 祝福语
.blessing {
  margin-top: $spacing-xl;
  padding: $spacing-lg;
  background: linear-gradient(135deg, #FFF9E6 0%, #FFE8CC 100%);
  border-radius: $border-radius-sm;
  border-left: 4px solid $gold-color;
  text-align: center;
}

.blessing-text {
  font-size: $font-size-base;
  color: $primary-color;
  font-weight: 600;
  margin: 0;
  letter-spacing: 1px;
}

// 操作按钮
.action-buttons {
  display: flex;
  justify-content: center;
  margin-bottom: $spacing-lg;
}

.action-button {
  padding: $spacing-lg $spacing-3xl;
  border: none;
  border-radius: $border-radius-full;
  font-size: $font-size-lg;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: $spacing-sm;
  transition: all $transition-base;

  &.primary {
    background: $gradient-red;
    color: white;
    box-shadow: $shadow-lg;

    &:hover {
      transform: translateY(-2px);
      box-shadow: $shadow-xl;
    }
  }

  &:active {
    transform: translateY(0);
  }
}

.button-icon {
  font-size: $font-size-lg;
}

// 免责声明
.disclaimer {
  text-align: center;
  padding: $spacing-base;

  p {
    font-size: $font-size-xs;
    color: $text-gray;
    margin: 0;
  }
}

// 响应式设计
@media (max-width: $breakpoint-sm) {
  .sign-card {
    padding: $spacing-lg;
  }

  .sign-title {
    font-size: $font-size-xl;
  }

  .poem-line {
    font-size: $font-size-base;
  }
}
</style>