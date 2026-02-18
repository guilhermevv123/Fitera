<template>
  <div class="bg-surface min-h-screen pb-24 flex flex-col">
    <!-- Header -->
    <header class="sticky top-0 z-50 bg-surface/95 backdrop-blur-md border-b border-primary/5 px-6 pt-4 pb-4">
      <div class="flex items-center justify-between py-2 mb-2">
        <h1 class="text-2xl font-bold tracking-tight">Loja</h1>
        <div class="flex items-center gap-2 bg-primary/10 px-3 py-1.5 rounded-full border border-primary/20">
          <span class="material-icons-round text-primary text-lg">monetization_on</span>
          <span class="font-bold text-primary text-sm">3,450 FC</span>
        </div>
      </div>
      <!-- Search -->
      <div class="relative">
        <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <span class="material-icons-round text-gray-400">search</span>
        </div>
        <input 
          type="text" 
          class="block w-full pl-11 pr-4 py-3 bg-white border-none rounded-full text-sm shadow-card placeholder-gray-400 focus:ring-2 focus:ring-primary focus:outline-none" 
          placeholder="Buscar serviços, roupas, suplementos..." 
        />
      </div>
    </header>

    <!-- Categories -->
    <div class="mt-4 px-6">
      <div class="flex gap-3 overflow-x-auto no-scrollbar pb-2">
        <button 
          v-for="cat in ['Tudo', 'Serviços', 'Roupas', 'Suplementos']"
          :key="cat"
          @click="filter = cat"
          class="flex-shrink-0 px-5 py-2.5 text-sm font-semibold rounded-full transition-all"
          :class="filter === cat ? 'bg-primary text-white shadow-soft' : 'bg-white text-gray-600 border border-gray-100'"
        >
          {{ cat }}
        </button>
      </div>
    </div>

    <div class="flex-1 overflow-y-auto no-scrollbar">
      
      <!-- Banner (Visible on 'Tudo') -->
      <section v-if="filter === 'Tudo'" class="mt-6 px-6">
        <div class="relative w-full h-48 rounded-2xl overflow-hidden shadow-lg group bg-gray-900">
          <img src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1000&auto=format&fit=crop" alt="Partner" class="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-500" />
          <div class="absolute inset-0 flex flex-col justify-center px-6">
            <span class="text-primary font-bold text-xs uppercase tracking-wider mb-2">Novo na Fitera</span>
            <h2 class="text-white text-2xl font-bold leading-tight mb-2">Coleção Verão</h2>
            <p class="text-gray-200 text-sm mb-4 max-w-[80%]">Tecnologia Dry-Fit com 20% off usando FitCoins.</p>
            <button class="w-fit px-4 py-2 bg-white text-black text-xs font-bold rounded-full hover:bg-gray-100 transition-colors">
              Ver Roupas
            </button>
          </div>
        </div>
      </section>

      <!-- Services Section -->
      <section v-if="showServices" class="mt-8">
        <div class="px-6 flex items-center justify-between mb-4">
          <div>
             <span class="text-xs font-bold text-primary uppercase tracking-wide">Evolua com Profissionais</span>
             <h3 class="text-xl font-bold text-gray-900">Serviços & Consultorias</h3>
          </div>
        </div>
        
        <div class="flex gap-4 overflow-x-auto no-scrollbar px-6 pb-4">
          <div v-for="service in services" :key="service.id" class="min-w-[260px] bg-white rounded-2xl p-3 shadow-card border border-gray-50 flex flex-col">
            <div class="relative h-32 rounded-xl overflow-hidden mb-3">
              <img :src="service.image" :alt="service.title" class="w-full h-full object-cover" />
              <div class="absolute bottom-2 left-2 bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded text-[10px] font-bold text-gray-800">
                ⭐ 4.9 (120)
              </div>
            </div>
            <h4 class="font-bold text-gray-900 mb-1">{{ service.title }}</h4>
            <p class="text-xs text-gray-500 mb-3">{{ service.brand }}</p>
            <div class="mt-auto flex justify-between items-center">
              <span class="font-bold text-gray-900">R$ {{ service.price.toFixed(2) }}</span>
              <button class="bg-primary/10 text-primary px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-primary hover:text-white transition-colors">
                Contratar
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- Clothes Section -->
      <section v-if="showClothes" class="mt-6 px-6">
        <h3 class="text-xl font-bold text-gray-900 mb-4">Moda Fitness</h3>
        <div class="grid grid-cols-2 gap-4">
          <div v-for="item in clothes" :key="item.id" class="bg-white rounded-2xl p-3 shadow-card border border-gray-50">
            <div class="relative aspect-[3/4] rounded-xl overflow-hidden mb-3">
              <img :src="item.image" :alt="item.title" class="w-full h-full object-cover" />
              <button class="absolute top-2 right-2 w-8 h-8 bg-white rounded-full shadow-sm flex items-center justify-center text-gray-400 hover:text-red-500">
                <span class="material-icons-round text-lg">favorite_border</span>
              </button>
            </div>
            <h4 class="font-semibold text-sm text-gray-800 leading-tight mb-1">{{ item.title }}</h4>
            <p class="text-xs text-gray-500 mb-2">{{ item.brand }}</p>
            <div class="flex items-center gap-1 mb-2">
              <span class="material-icons-round text-[10px] text-primary">monetization_on</span>
              <span class="text-xs font-bold text-primary">{{ item.priceCoins }} FC</span>
            </div>
            <button class="w-full py-2 bg-gray-900 text-white text-xs font-bold rounded-lg">
              Comprar
            </button>
          </div>
        </div>
      </section>

      <!-- Supplements Section -->
      <section v-if="showSupplements" class="mt-8 px-6 mb-8">
        <h3 class="text-xl font-bold text-gray-900 mb-4">Suplementos Essenciais</h3>
        <div class="space-y-3">
          <div v-for="item in supplements" :key="item.id" class="bg-white rounded-2xl p-3 shadow-card border border-gray-50 flex gap-4">
            <div class="w-24 h-24 rounded-xl bg-gray-50 shrink-0 p-2">
              <img :src="item.image" :alt="item.title" class="w-full h-full object-contain mix-blend-multiply" />
            </div>
            <div class="flex-1 py-1 flex flex-col">
              <h4 class="font-bold text-gray-900 mb-1">{{ item.title }}</h4>
              <p class="text-xs text-gray-500 mb-2">{{ item.brand }}</p>
              <span v-if="item.discount" class="inline-block bg-red-100 text-red-600 text-[10px] font-bold px-2 py-0.5 rounded w-fit mb-auto">
                {{ item.discount }}% OFF
              </span>
              <div class="flex justify-between items-end mt-2">
                <span class="font-bold text-lg text-gray-900">R$ {{ item.price.toFixed(2) }}</span>
                <button class="w-8 h-8 bg-primary text-white rounded-lg flex items-center justify-center shadow-md shadow-primary/30">
                  <span class="material-icons-round text-sm">add_shopping_cart</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { MOCK_PRODUCTS } from '~/utils/mockData';

const filter = ref('Tudo');

const services = computed(() => MOCK_PRODUCTS.filter(p => p.category === 'Serviços'));
const clothes = computed(() => MOCK_PRODUCTS.filter(p => p.category === 'Roupas'));
const supplements = computed(() => MOCK_PRODUCTS.filter(p => p.category === 'Suplementos'));

const showServices = computed(() => filter.value === 'Tudo' || filter.value === 'Serviços');
const showClothes = computed(() => filter.value === 'Tudo' || filter.value === 'Roupas');
const showSupplements = computed(() => filter.value === 'Tudo' || filter.value === 'Suplementos');
</script>
