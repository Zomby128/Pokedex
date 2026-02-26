<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import PokeballLoader from './PokeballLoader.vue'

const pokemons = ref([])
const loading = ref(true)
const router = useRouter()

const getData = async () => {
  try {
    loading.value = true
    // Obtener lista de Pokémon
    const { data } = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=151')
    
    // Obtener detalles de cada Pokémon
    const pokemonDetails = await Promise.all(
      data.results.map(async (pokemon) => {
        const details = await axios.get(pokemon.url)
        return {
          name: pokemon.name,
          id: details.data.id,
          image: details.data.sprites.other['official-artwork'].front_default,
          types: details.data.types.map(t => t.type.name)
        }
      })
    )
    
    pokemons.value = pokemonDetails.sort((a, b) => a.id - b.id)
    loading.value = false
  } catch(error) {
    console.log(error)
    loading.value = false
  }
}

const goToPokemon = (name) => {
  router.push(`/pokemon/${name}`)
}

onMounted(() => {
  getData()
})
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold text-center mb-8">Pokédex</h1>
    
    <!-- Loading con Pokébola -->
    <div v-if="loading" class="flex justify-center items-center py-12">
      <PokeballLoader text="Cargando Pokémon..." />
    </div>
    
    <!-- Lista de Pokémon -->
    <div v-else class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <div 
        v-for="pokemon in pokemons" 
        :key="pokemon.id"
        @click="goToPokemon(pokemon.name)"
        class="bg-white rounded-lg shadow-md p-4 cursor-pointer hover:shadow-lg transition-shadow"
      >
        <!-- Imagen -->
        <img 
          :src="pokemon.image" 
          :alt="pokemon.name"
          class="w-32 h-32 mx-auto mb-2"
        >
        
        <!-- Número y nombre -->
        <div class="text-center">
          <span class="text-sm text-gray-500">#{{ String(pokemon.id).padStart(3, '0') }}</span>
          <h2 class="text-lg font-semibold capitalize">{{ pokemon.name }}</h2>
        </div>
        
        <!-- Tipos -->
        <div class="flex gap-1 justify-center mt-2">
          <span 
            v-for="type in pokemon.types" 
            :key="type"
            class="px-2 py-1 text-xs text-white rounded-full capitalize"
            :class="{
              'bg-green-500': type === 'grass',
              'bg-red-500': type === 'fire',
              'bg-blue-500': type === 'water',
              'bg-yellow-500': type === 'electric',
              'bg-purple-500': type === 'poison',
              'bg-gray-500': type === 'normal',
              'bg-yellow-700': type === 'ground',
              'bg-pink-500': type === 'fairy',
              'bg-indigo-500': type === 'psychic',
              'bg-orange-500': type === 'fighting',
              'bg-stone-500': type === 'rock',
              'bg-sky-500': type === 'flying',
              'bg-lime-500': type === 'bug',
              'bg-violet-500': type === 'ghost',
              'bg-zinc-500': type === 'dark',
              'bg-indigo-500': type === 'dragon',
              'bg-cyan-500': type === 'ice'
            }"
          >
            {{ type }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>