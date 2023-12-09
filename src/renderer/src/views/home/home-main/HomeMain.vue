<template>
  <main class="h-full bg-slate-300 dark:bg-[rgb(17,17,17)] dark:text-white overflow-hidden">
    <div class="h-[20%] drag">
      <q-img src="https://cdn.quasar.dev/img/parallax2.jpg" class="h-full drag" >
        <div class="absolute-full text-subtitle2 flex flex-center">
          Home
        </div>
      </q-img>
    </div>
    <div>
      <q-carousel
        v-model="slide"
        transition-prev="jump-right"
        transition-next="jump-left"
        swipeable
        animated
        control-color="white"
        prev-icon="arrow_left"
        next-icon="arrow_right"
        navigation-icon="radio_button_unchecked"
        navigation
        padding
        arrows
        height="30%"
        class="bg-primary text-white shadow-1 rounded-borders m-4"
      >
        <q-carousel-slide name="style" class="column no-wrap flex-center">
          <q-icon name="style" size="56px" />
          <div class="q-mt-md text-center">
            1
          </div>
        </q-carousel-slide>
        <q-carousel-slide name="tv" class="column no-wrap flex-center">
          <q-icon name="live_tv" size="56px" />
          <div class="q-mt-md text-center">
            2
          </div>
        </q-carousel-slide>
      </q-carousel>
    </div>
    <div class="w-full h-[50%] bg-white">
      <q-list separator>
        <q-slide-item @left="onLeft">
          <template v-slot:left>
            <q-icon name="done" />
          </template>

          <q-item>
            <q-item-section avatar>
              <q-avatar color="primary" text-color="white" icon="bluetooth" />
            </q-item-section>
            <q-item-section>左拉同意好友申请</q-item-section>
          </q-item>
        </q-slide-item>

        <q-slide-item @left="onLeft">
          <template v-slot:left>
            <q-icon name="done" />
          </template>

          <q-item>
            <q-item-section avatar>
              <q-avatar>
                <img src="https://cdn.quasar.dev/img/avatar6.jpg" draggable="false">
              </q-avatar>
            </q-item-section>
            <q-item-section>左拉同意好友申请</q-item-section>
          </q-item>
        </q-slide-item>

        <q-slide-item @left="onLeft">
          <template v-slot:left>
            <div class="row items-center">
              <q-icon left name="done" />
            </div>
          </template>

          <q-item>
            <q-item-section avatar>
              <q-avatar>
                <img src="https://cdn.quasar.dev/img/avatar4.jpg" draggable="false">
              </q-avatar>
            </q-item-section>
            <q-item-section>左拉同意好友申请</q-item-section>
          </q-item>
        </q-slide-item>
      </q-list>
    </div>
  </main>
</template>

<script setup lang='ts'>
import { ref, onBeforeUnmount } from "vue";
import { useQuasar } from 'quasar'
const slide = ref('style')

const $q = useQuasar()
let timer

function finalize (reset) {
  timer = setTimeout(() => {
    reset()
  }, 1000)
}

const onLeft = ({ reset }) => {
  $q.notify('Left action triggered. Resetting in 1 second.')
  finalize(reset)
}

onBeforeUnmount(() => {
  clearTimeout(timer)
})
</script>