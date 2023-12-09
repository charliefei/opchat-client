<template>
  <main class="h-full w-full font-bold bg-slate-200 dark:bg-[rgb(27,27,27)]">
    <q-splitter
      v-model="splitterModel"
      :separator-style="{width: '0', height: '0'}"
      disable
      class="h-screen"
    >
      <template v-slot:before>
        <header class="h-14 w-[26%] fixed drag">
          <div class="font-bold h-full w-full text-base mt-6 ml-5">私信</div> 
        </header>
        <div class="h-full w-full pt-14">
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
            class="h-full w-full"
          >
            <q-list>
              <q-item 
                v-for="contact in contacts" 
                :key="contact.id" 
                class="q-my-sm" 
                clickable 
                v-ripple
                @click="goToChat(contact)"
              >
                <q-item-section avatar>
                  <q-avatar color="primary" text-color="white">
                    {{ contact.letter }}
                  </q-avatar>
                </q-item-section>

                <q-item-section>
                  <q-item-label>{{ contact.name }}</q-item-label>
                  <q-item-label class="text-slate-400" lines="2">{{ contact.email }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-scroll-area>
        </div>
      </template>

      <template v-slot:after>
        <router-view></router-view>
      </template>
    </q-splitter>
  </main>
</template>

<script setup lang='ts'>
import {ref} from 'vue'
import { useRouter } from 'vue-router';
const splitterModel = ref(28)
const $router = useRouter()

const contacts = [ 
  {
    id: 1,
    name: 'Fei Rui',
    email: 'charliefei839@gmail.com',
    letter: 'F'
  }, 
  {
    id: 2,
    name: 'Charlie Fei',
    email: 'charliefei839@outlook.com',
    letter: 'C'
  }, 
  {
    id: 3,
    name: '张维为',
    email: 'iloveusa@gmail.com',
    letter: '张'
  }, 
  {
    id: 4,
    name: '郭继承',
    email: 'rulai@qq.com',
    letter: '郭'
  }
]

const goToChat = (contact: any) => {
  $router.push({
    path: '/private/chat',
    query: {
      id: contact.id,
      name: contact.name
    }
  })
}
</script>