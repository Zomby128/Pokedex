<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
  <div class="min-h-screen bg-gray-100 flex items-center justify-center">
    <div class="text-center">
      <h1 class="text-4xl font-bold mb-4">Bienvenido a la Pokédex</h1>
      <p class="text-xl text-gray-600 mb-8">Explora todos los Pokémon de Kanto</p>
      <button 
        @click="router.push('/pokemon')"
        class="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 text-lg"
      >
        Ver Pokédex
      </button>
    </div>
  </div>
</template>