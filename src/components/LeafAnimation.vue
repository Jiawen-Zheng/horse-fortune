<template>
  <div class="leaf-animation" v-if="isVisible">
    <div
      v-for="leaf in leaves"
      :key="leaf.id"
      class="leaf"
      :class="{ 'leaf-landed': hasLanded }"
      :style="{
        left: leaf.left + '%',
        animationDelay: leaf.delay + 's',
        animationDuration: leaf.duration + 's'
      }"
    >
      <!-- 飘落过程中始终显示绿色正面 -->
      <div
        class="leaf-icon"
        :class="{
          'leaf-falling': !hasLanded,
          'leaf-front': hasLanded && !leaf.isBack,
          'leaf-reverse': hasLanded && leaf.isBack
        }"
      >
        🍃
      </div>
      <!-- 落地后才显示正反面文字 -->
      <div v-if="hasLanded" class="leaf-result" :class="{ 'result-front': !leaf.isBack, 'result-back': leaf.isBack }">
        {{ leaf.isBack ? '反' : '正' }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps({
  duration: {
    type: Number,
    default: 3500 // 动画持续时间（毫秒）- 增加以显示结果
  }
})

const emit = defineEmits(['complete'])

const isVisible = ref(true)
const hasLanded = ref(false)
const leaves = ref([])

// 生成3片树叶的随机属性
const generateLeaves = () => {
  return [
    {
      id: 1,
      left: 20 + Math.random() * 20, // 20-40%
      isBack: Math.random() > 0.5, // 随机正反面
      delay: 0,
      duration: 1.5 + Math.random() * 0.3 // 1.5-1.8秒
    },
    {
      id: 2,
      left: 40 + Math.random() * 20, // 40-60%
      isBack: Math.random() > 0.5,
      delay: 0.2,
      duration: 1.5 + Math.random() * 0.3
    },
    {
      id: 3,
      left: 60 + Math.random() * 20, // 60-80%
      isBack: Math.random() > 0.5,
      delay: 0.4,
      duration: 1.5 + Math.random() * 0.3
    }
  ]
}

onMounted(() => {
  leaves.value = generateLeaves()
  
  // 树叶落地后显示结果
  setTimeout(() => {
    hasLanded.value = true
  }, 2000) // 2秒后树叶落地
  
  // 显示结果1.5秒后触发完成事件
  setTimeout(() => {
    isVisible.value = false
    emit('complete')
  }, props.duration)
})
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

.leaf-animation {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 9999;
  overflow: hidden;
}

.leaf {
  position: absolute;
  top: -50px;
  font-size: 40px;
  animation: fall linear forwards;
  transform-origin: center;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.leaf-icon {
  transition: all 0.5s ease;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.15));
}

// 飘落过程中：始终保持绿色正面
.leaf-icon.leaf-falling {
  filter: hue-rotate(0deg) saturate(1.5) brightness(1.1) drop-shadow(0 2px 4px rgba(0, 0, 0, 0.15));
}

// 落地后正面：绿色
.leaf-icon.leaf-front {
  filter: hue-rotate(0deg) saturate(1.5) brightness(1.1) drop-shadow(0 2px 4px rgba(0, 0, 0, 0.15));
}

// 落地后反面：黄色
.leaf-icon.leaf-reverse {
  filter: hue-rotate(60deg) saturate(1.8) brightness(1.2) drop-shadow(0 2px 4px rgba(0, 0, 0, 0.15));
  transform: scaleX(-1);
}

.leaf-result {
  font-size: 24px;
  font-weight: bold;
  background: white;
  padding: 4px 12px;
  border-radius: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  animation: resultAppear 0.5s ease-out;
  white-space: nowrap;
}

// 正面结果：绿色字体和边框
.leaf-result.result-front {
  color: #4CAF50;
  border: 2px solid #4CAF50;
}

// 反面结果：黄色字体和边框
.leaf-result.result-back {
  color: #FFC107;
  border: 2px solid #FFC107;
}

@keyframes resultAppear {
  0% {
    opacity: 0;
    transform: scale(0.5);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

.leaf-landed {
  animation: fall linear forwards, settle 0.5s ease-out 1.5s forwards !important;
}

@keyframes fall {
  0% {
    top: -50px;
    transform: translateX(0) rotate(0deg);
    opacity: 1;
  }
  
  25% {
    transform: translateX(30px) rotate(90deg);
  }
  
  50% {
    transform: translateX(-20px) rotate(180deg);
  }
  
  75% {
    transform: translateX(15px) rotate(270deg);
  }
  
  100% {
    top: calc(100vh - 200px);
    transform: translateX(0) rotate(360deg);
    opacity: 1;
  }
}

@keyframes settle {
  0% {
    transform: translateX(0) rotate(360deg);
  }
  100% {
    transform: translateX(0) rotate(0deg);
  }
}

// 响应式设计
@media (max-width: $breakpoint-sm) {
  .leaf {
    font-size: 32px;
  }
  
  .leaf-result {
    font-size: 20px;
    padding: 3px 10px;
  }
  
  @keyframes fall {
    0% {
      top: -50px;
      transform: translateX(0) rotate(0deg);
      opacity: 1;
    }
    
    25% {
      transform: translateX(20px) rotate(90deg);
    }
    
    50% {
      transform: translateX(-15px) rotate(180deg);
    }
    
    75% {
      transform: translateX(10px) rotate(270deg);
    }
    
    100% {
      top: calc(100vh - 180px);
      transform: translateX(0) rotate(360deg);
      opacity: 1;
    }
  }
}
</style>