<script setup>
import axios from 'axios'
import { useRoute, useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'
import PokemonCry from '@/components/PokemonCry.vue'

const route = useRoute()
const router = useRouter()
const pokemon = ref(null)
const loading = ref(true)

const getData = async () => {
  try {
    loading.value = true
    const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${route.params.name}`)
    pokemon.value = data
  } catch(error) {
    console.log(error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  getData()
})
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <button 
      @click="router.push('/pokemon')"
      class="mb-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors flex items-center gap-2"
    >
      ← Volver a la Pokédex
    </button>

    <!-- Loading -->
    <div v-if="loading" class="flex justify-center items-center py-12">
      <div class="text-center">
        <div class="animate-spin rounded-full h-16 w-16 border-4 border-red-500 border-t-transparent mb-4"></div>
        <p>Cargando información de {{ route.params.name }}...</p>
      </div>
    </div>

    <!-- Información del Pokémon -->
    <div v-else-if="pokemon" class="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
      <!-- Cabecera con botón de sonido -->
      <div class="bg-gradient-to-r from-red-500 to-red-600 p-6 text-white">
        <div class="flex items-center justify-between">
          <div>
            <span class="text-sm opacity-75">#{{
              String(pokemon.id).padStart(3, '0')
            }}</span>
            <h1 class="text-4xl font-bold capitalize">{{ pokemon.name }}</h1>
          </div>
          
          <!-- Botón de sonido con VueUse -->
          <PokemonCry 
            :cry-url="pokemon.cries?.latest" 
            :pokemon-name="pokemon.name"
          />
        </div>
      </div>

      <div class="p-6">
        <div class="grid md:grid-cols-2 gap-8">
          <!-- Imagen -->
          <div class="bg-gray-50 rounded-xl p-8 flex justify-center items-center">
            <img 
              :src="pokemon.sprites.other['official-artwork'].front_default"
              :alt="pokemon.name"
              class="w-64 h-64 object-contain hover:scale-105 transition-transform"
            >
          </div>

          <!-- Información -->
          <div>
            <!-- Tipos -->
            <div class="mb-6">
              <h3 class="text-lg font-semibold mb-2">Tipos</h3>
              <div class="flex gap-2">
                <span 
                  v-for="type in pokemon.types" 
                  :key="type.type.name"
                  class="px-4 py-2 rounded-full text-white text-sm capitalize"
                  :class="{
                    'bg-green-500': type.type.name === 'grass',
                    'bg-red-500': type.type.name === 'fire',
                    'bg-blue-500': type.type.name === 'water',
                    'bg-yellow-500': type.type.name === 'electric',
                    'bg-purple-500': type.type.name === 'poison',
                    'bg-gray-500': type.type.name === 'normal',
                    'bg-yellow-700': type.type.name === 'ground',
                    'bg-pink-500': type.type.name === 'fairy',
                    'bg-indigo-500': type.type.name === 'psychic',
                    'bg-orange-500': type.type.name === 'fighting',
                    'bg-stone-500': type.type.name === 'rock',
                    'bg-sky-500': type.type.name === 'flying',
                    'bg-lime-500': type.type.name === 'bug',
                    'bg-violet-500': type.type.name === 'ghost',
                    'bg-zinc-500': type.type.name === 'dark',
                    'bg-indigo-500': type.type.name === 'dragon',
                    'bg-cyan-500': type.type.name === 'ice'
                  }"
                >
                  {{ type.type.name }}
                </span>
              </div>
            </div>

            <!-- Características -->
            <div class="grid grid-cols-2 gap-4 mb-6">
              <div class="bg-gray-50 p-4 rounded-lg">
                <p class="text-gray-600 text-sm">Altura</p>
                <p class="text-2xl font-bold">{{ (pokemon.height / 10).toFixed(1) }} m</p>
              </div>
              <div class="bg-gray-50 p-4 rounded-lg">
                <p class="text-gray-600 text-sm">Peso</p>
                <p class="text-2xl font-bold">{{ (pokemon.weight / 10).toFixed(1) }} kg</p>
              </div>
            </div>

            <!-- Habilidades -->
            <div class="mb-6">
              <h3 class="text-lg font-semibold mb-2">Habilidades</h3>
              <div class="flex flex-wrap gap-2">
                <span 
                  v-for="ability in pokemon.abilities" 
                  :key="ability.ability.name"
                  class="px-3 py-1 bg-gray-200 rounded-full text-sm capitalize"
                >
                  {{ ability.ability.name.replace('-', ' ') }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Estadísticas -->
        <div class="mt-8">
          <h3 class="text-xl font-semibold mb-4">Estadísticas</h3>
          <div class="grid gap-4">
            <div v-for="stat in pokemon.stats" :key="stat.stat.name" class="space-y-1">
              <div class="flex justify-between text-sm">
                <span class="capitalize">{{ stat.stat.name.replace('-', ' ') }}</span>
                <span class="font-semibold">{{ stat.base_stat }}</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  class="bg-red-500 h-2.5 rounded-full transition-all duration-500"
                  :style="{ width: (stat.base_stat / 255) * 100 + '%' }"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>