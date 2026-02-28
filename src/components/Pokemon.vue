<script setup>
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const pokemons = ref([])
const loading = ref(true)
const router = useRouter()

// Variables para paginación
const currentPage = ref(1)
const itemsPerPage = ref(12) // 12 Pokémon por página
const totalPokemons = ref(0)

// Pokémon paginados
const paginatedPokemons = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return pokemons.value.slice(start, end)
})

// Total de páginas
const totalPages = computed(() => {
  return Math.ceil(pokemons.value.length / itemsPerPage.value)
})

// Números de página para mostrar
const pageNumbers = computed(() => {
  const pages = []
  const maxVisiblePages = 5 // Máximo de páginas visibles en la navegación
  
  let startPage = Math.max(1, currentPage.value - 2)
  let endPage = Math.min(totalPages.value, startPage + maxVisiblePages - 1)
  
  if (endPage - startPage < maxVisiblePages - 1) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1)
  }
  
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i)
  }
  
  return pages
})

// Cambiar de página
const changePage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
    // Scroll suave hacia arriba
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

const getData = async () => {
  try {
    loading.value = true
    // Obtener lista de Pokémon (seguimos obteniendo todos para la paginación)
    const { data } = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=151')
    totalPokemons.value = data.count
    
    // Obtener detalles de cada Pokémon
    const pokemonDetails = await Promise.all(
      data.results.map(async (pokemon) => {
        const details = await axios.get(pokemon.url)
        return {
          name: pokemon.name,
          id: details.data.id,
          image: details.data.sprites.other['official-artwork'].front_default,
          sprite: details.data.sprites.front_default,
          types: details.data.types.map(t => t.type.name),
          cries: details.data.cries
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
    
    <!-- Loading -->
    <div v-if="loading" class="text-center py-8">
      <p class="text-xl">Cargando Pokémon...</p>
    </div>
    
    <!-- Lista de Pokémon paginada -->
    <div v-else>
      <!-- Contador de resultados -->
      <div class="text-right mb-4 text-gray-600">
        Mostrando {{ paginatedPokemons.length }} de {{ pokemons.length }} Pokémon
      </div>
      
      <!-- Grid de Pokémon -->
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <div 
          v-for="pokemon in paginatedPokemons" 
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

      <!-- Controles de paginación -->
      <div class="flex justify-center items-center gap-2 mt-8">
        <!-- Botón Anterior -->
        <button 
          @click="changePage(currentPage - 1)"
          :disabled="currentPage === 1"
          class="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 transition-colors"
        >
          ← Anterior
        </button>

        <!-- Números de página -->
        <div class="flex gap-1">
          <!-- Primera página si no está visible -->
          <button 
            v-if="pageNumbers[0] > 1"
            @click="changePage(1)"
            class="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
          >
            1
          </button>
          
          <!-- Puntos suspensivos -->
          <span v-if="pageNumbers[0] > 2" class="px-2 py-2">...</span>

          <!-- Páginas numeradas -->
          <button 
            v-for="page in pageNumbers" 
            :key="page"
            @click="changePage(page)"
            :class="[
              'px-4 py-2 rounded-lg transition-colors',
              currentPage === page 
                ? 'bg-red-500 text-white' 
                : 'bg-gray-200 hover:bg-gray-300'
            ]"
          >
            {{ page }}
          </button>

          <!-- Puntos suspensivos -->
          <span v-if="pageNumbers[pageNumbers.length - 1] < totalPages - 1" class="px-2 py-2">...</span>

          <!-- Última página si no está visible -->
          <button 
            v-if="pageNumbers[pageNumbers.length - 1] < totalPages"
            @click="changePage(totalPages)"
            class="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
          >
            {{ totalPages }}
          </button>
        </div>

        <!-- Botón Siguiente -->
        <button 
          @click="changePage(currentPage + 1)"
          :disabled="currentPage === totalPages"
          class="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 transition-colors"
        >
          Siguiente →
        </button>
      </div>
    </div>
  </div>
</template>