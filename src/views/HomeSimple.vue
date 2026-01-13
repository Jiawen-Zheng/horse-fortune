<template>
  <div class="home-simple">
    <h1>🐴 马年好运签</h1>
    <p>测一测您的马年运势</p>
    <button @click="goNext">开始测运</button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goNext = () => {
  router.push('/sign-select')
}
</script>

<style scoped>
.home-simple {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background: linear-gradient(180deg, #FFF5F5 0%, #FFEBEE 100%);
}

h1 {
  font-size: 36px;
  color: #D32F2F;
  margin: 0 0 20px 0;
}

p {
  font-size: 18px;
  color: #666;
  margin: 0 0 40px 0;
}

button {
  padding: 15px 40px;
  background: linear-gradient(135deg, #D32F2F 0%, #B71C1C 100%);
  color: white;
  border: none;
  border-radius: 25px;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
}

button:active {
  transform: scale(0.95);
}
</style>