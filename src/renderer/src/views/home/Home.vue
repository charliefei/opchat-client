<template>
  <main class="h-screen w-full bg-slate-200 dark:bg-zinc-900">
    <q-splitter
      v-model="splitterModel"
      unit="px"
      :separator-style="{width: '0px', backgroundColor: '#eee'}"
      disable 
      class="h-screen"
    >
      <template v-slot:before>
        <header class="h-14 w-[26%] fixed drag flex justify-center items-end">
          <q-btn-dropdown class="q-px-xl no-drag" dropdown-icon="menu" color="primary" label="下拉菜单">
            <q-list class="text-center font-bold">
              <q-item 
                class="border-b border-b-slate-500" 
                clickable v-close-popup 
                @click="onMenuItemClick(1)"
              >
                <q-item-section>
                  <q-item-label>添加好友/频道</q-item-label>
                </q-item-section>
              </q-item>
              <q-item clickable v-close-popup @click="onMenuItemClick(2)">
                <q-item-section>
                  <q-item-label>创建频道</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
        </header>
        <div class="h-full w-full pt-14">
          <q-list padding class="w-full">
            <q-item-label header>好友</q-item-label>
            <q-item clickable v-ripple>
              <q-item-section avatar top>
                <q-avatar icon="people" color="primary" text-color="white" />
              </q-item-section>

              <q-item-section>
                <q-item-label lines="1">测试好友</q-item-label>
                <q-item-label caption>introduce ...</q-item-label>
              </q-item-section>
            </q-item>

            <q-separator spaced />
            <q-item-label header>频道</q-item-label>
            <q-item clickable v-ripple>
              <q-item-section avatar top>
                <q-avatar icon="groups" color="orange" text-color="white" />
              </q-item-section>

              <q-item-section>
                <q-item-label lines="1">测试频道</q-item-label>
                <q-item-label caption>introduce ...</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </div>
      </template>
      <template v-slot:after>
        <main class="h-full bg-slate-300 dark:bg-[rgb(17,17,17)] dark:text-white overflow-hidden">
          <router-view></router-view>
        </main>
      </template>
    </q-splitter>
  </main>
  <AddDialog ref="addDialogRef" />
</template>

<script setup lang='ts'>
import { ref } from 'vue'
import AddDialog from "./components/AddDialog.vue";
const splitterModel = ref(250)
const addDialogRef = ref()
const onMenuItemClick = (type: number) => {
  if(type == 1) {
    // addDialogRef.value.dialogRef.show();
    window.api.openAddDialogWin()
  } else if (type == 2) {
    
  }
}
</script>