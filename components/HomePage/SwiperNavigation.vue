<template>
  <div class="hidden md:flex z-10 gap-3 absolute right-10 bottom-10">
    <UButton
      @click="swiper.slidePrev()"
      color="white"
      class="text-white p-4"
      variant="outline"
      size="xl"
      :ui="{ rounded: 'rounded-2xl' }"
      icon="i-heroicons-chevron-left"
    />
    <UButton
      @click="swiper.slideNext()"
      color="white"
      class="text-white p-4"
      variant="outline"
      size="xl"
      :ui="{ rounded: 'rounded-2xl' }"
      icon="i-heroicons-chevron-right"
    />
  </div>
</template>
<script setup>
const swiper = useSwiper();
</script>
<style></style>
