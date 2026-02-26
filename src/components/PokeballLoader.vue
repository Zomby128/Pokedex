<template>
  <div class="pokeball-loader">
    <div class="pokeball">
      <div class="pokeball__button"></div>
    </div>
    <p class="loading-text" v-if="text">{{ text }}</p>
  </div>
</template>

<script setup>
defineProps({
  text: {
    type: String,
    default: 'Cargando...'
  }
})
</script>

<style scoped>
.pokeball-loader {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

.pokeball {
  width: 60px;
  height: 60px;
  background-color: #fff;
  border-radius: 50%;
  position: relative;
  overflow: hidden;
  border: 3px solid #000;
  animation: rotate 1.5s infinite ease-in-out;
}

.pokeball::before {
  content: "";
  position: absolute;
  background-color: #ef5350;
  width: 100%;
  height: 50%;
  top: 0;
  left: 0;
}

.pokeball::after {
  content: "";
  position: absolute;
  background-color: #fff;
  width: 100%;
  height: 10px;
  top: 50%;
  transform: translateY(-50%);
  border-top: 2px solid #000;
  border-bottom: 2px solid #000;
}

.pokeball__button {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 15px;
  height: 15px;
  background-color: #fff;
  border: 2px solid #000;
  border-radius: 50%;
  z-index: 10;
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.loading-text {
  font-family: 'VT323', monospace;
  font-size: 1.2rem;
  color: #333;
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}
</style>