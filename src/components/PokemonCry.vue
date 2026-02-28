<template>
  <button
    @click="toggleSound"
    :disabled="isLoading"
    class="group relative flex items-center justify-center w-12 h-12 
           bg-gradient-to-br from-red-400 to-red-600 
           rounded-full shadow-lg hover:shadow-xl
           transform hover:scale-110 active:scale-95
           transition-all duration-200
           disabled:opacity-50 disabled:cursor-not-allowed"
    :title="`Escuchar grito de ${pokemonName}`"
  >
    <!-- Icono según estado -->
    <span class="text-2xl transition-transform group-hover:rotate-12">
      <span v-if="isPlaying" class="animate-pulse">🔊</span>
      <span v-else-if="isLoading" class="animate-spin">⏳</span>
      <span v-else>🔈</span>
    </span>

    <!-- Onda de sonido animada -->
    <span 
      v-if="isPlaying"
      class="absolute inset-0 rounded-full animate-ping bg-white opacity-30"
    ></span>
  </button>
</template>

<script setup>
import { useSound } from '@vueuse/sound'
import { ref } from 'vue'

const props = defineProps({
  cryUrl: {
    type: String,
    required: true
  },
  pokemonName: {
    type: String,
    required: true
  }
})

const isLoading = ref(true)

// Usar VueUse/sound
const { play, stop, isPlaying } = useSound(props.cryUrl, {
  volume: 0.5, // Volumen al 50%
  onload: () => {
    isLoading.value = false
  },
  onerror: (error) => {
    console.error(`Error cargando sonido de ${props.pokemonName}:`, error)
    isLoading.value = false
  }
})

const toggleSound = () => {
  if (isPlaying.value) {
    stop()
  } else {
    play()
  }
}
</script>