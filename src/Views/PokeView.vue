<script setup>
import axios from 'axios'
import { useRoute, useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'
import PokeballLoader from '../components/PokeballLoader.vue'

const route = useRoute()
const router = useRouter()
const pokemon = ref(null)
const loading = ref(true)

const back = () => {
  router.push('/pokemon')
}

const getData = async () => {
  try {
    loading.value = true
    const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${route.params.name}`)
    pokemon.value = data
    console.log(data)
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
    <!-- Botón volver -->
    <button 
      @click="back"
      class="mb-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
    >
      ← Volver
    </button>

    <!-- Loading con Pokébola -->
    <div v-if="loading" class="flex justify-center items-center py-12">
      <PokeballLoader text="Cargando Pokémon..." />
    </div>

    <!-- Información del Pokémon -->
    <div v-else-if="pokemon" class="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6">
      <div class="text-center">
        <!-- Imagen oficial -->
        <img 
          :src="pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default"
          :alt="pokemon.name"
          class="w-48 h-48 mx-auto mb-4"
        >
        
        <!-- Nombre y número -->
        <h1 class="text-3xl font-bold capitalize mb-2">
          #{{ String(pokemon.id).padStart(3, '0') }} {{ pokemon.name }}
        </h1>
        
        <!-- Tipos -->
        <div class="flex gap-2 justify-center mb-6">
          <span 
            v-for="type in pokemon.types" 
            :key="type.type.name"
            class="px-3 py-1 rounded-full text-white text-sm capitalize"
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
        
        <!-- Información básica -->
        <div class="grid grid-cols-2 gap-4 mb-6">
          <div class="bg-gray-100 p-3 rounded">
            <p class="text-gray-600 text-sm">Altura</p>
            <p class="text-xl font-semibold">{{ (pokemon.height / 10).toFixed(1) }} m</p>
          </div>
          <div class="bg-gray-100 p-3 rounded">
            <p class="text-gray-600 text-sm">Peso</p>
            <p class="text-xl font-semibold">{{ (pokemon.weight / 10).toFixed(1) }} kg</p>
          </div>
        </div>
        
        <!-- Estadísticas -->
        <div class="mt-6">
          <h2 class="text-xl font-semibold mb-4">Estadísticas</h2>
          <div v-for="stat in pokemon.stats" :key="stat.stat.name" class="mb-3">
            <div class="flex justify-between mb-1">
              <span class="text-sm capitalize">{{ stat.stat.name.replace('-', ' ') }}</span>
              <span class="text-sm font-semibold">{{ stat.base_stat }}</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2">
              <div 
                class="bg-blue-500 h-2 rounded-full" 
                :style="{ width: (stat.base_stat / 255) * 100 + '%' }"
              ></div>
            </div>
          </div>
        </div>
        
        <!-- Habilidades -->
        <div class="mt-6">
          <h2 class="text-xl font-semibold mb-4">Habilidades</h2>
          <div class="flex flex-wrap gap-2 justify-center">
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
  </div>
</template>