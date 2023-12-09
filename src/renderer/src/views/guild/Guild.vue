<template>
  <main class="h-screen w-full bg-slate-200 dark:bg-zinc-900">
    <q-splitter
      v-model="splitterModel"
      :separator-style="{width: '0', height: '0'}"
      disable
      class="h-screen"
    >
      <template v-slot:before>
        <header class="h-32 w-[26.5%] fixed border-b border-b-zinc-800 drag">
          <q-img 
            class="h-full w-full object-contain"
            :src="$route.query.img?.toString()"
          >
            <div class="absolute-bottom text-left font-bold text-base">
              🏘️ {{ $route.query.name }}
            </div>
          </q-img>
        </header>
        <q-scroll-area
          :thumb-style="{
            borderRadius: '5px',
            backgroundColor: '#027be3',
            width: '5px',
            opacity: '0.75',
            height: '5px',
            maxHeight: '30px',
            maxWidth: '30px'
          }"
          class="h-full w-full mt-32"
        >
          <section class="h-full w-full">
            111
          </section>
        </q-scroll-area>
      </template>

      <template v-slot:after>
        <router-view></router-view>
      </template>
    </q-splitter>
  </main>
</template>

<script setup lang='ts'>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
const splitterModel = ref(28)
const $route = useRoute()

onMounted(() => {
  console.log($route.query);
})
</script>