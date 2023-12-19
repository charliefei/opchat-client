<template>
  <main class="h-full bg-slate-300 dark:bg-[rgb(17,17,17)] dark:text-white">
    <header class="h-14 border-b border-b-zinc-800 pt-5 pb-2 z-50 drag">
      <div class="flex justify-between items-center px-3">
        <div class="font-bold text-lg no-drag">{{ name }}</div>
        <div class="flex gap-4 items-center dark:text-white no-drag">
          <q-icon class="cursor-pointer" name="o_featured_video" size="25px"></q-icon>
          <q-icon class="cursor-pointer" name="o_video_camera_front" size="25px"></q-icon>
          <q-icon class="cursor-pointer" name="o_settings" size="25px"></q-icon>
        </div>
      </div>
    </header>
    <section class="flex h-full w-full">
      <section class="flex-[3] border-r border-r-zinc-800 flex flex-col">
        <section class="flex-[1.5] border-b border-b-zinc-800">11</section>
        <section class="flex-[1] px-5 py-1">
          22
        </section>
      </section>
      <section class="flex-[1]">33</section>
    </section>
  </main>
</template>

<script setup lang='ts'>
defineProps<{
  name: string
}>()
</script>