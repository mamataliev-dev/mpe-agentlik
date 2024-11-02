<template>
  <ULink v-if="ad" :to="ad.url" target="_blank"
    class="w-full max-h-[100px] md:max-h-[180px] rounded-md md:rounded-2xl overflow-hidden block"
  >
    <img class="h-full w-full object-contain" :src="ad.image" :alt="ad.title">
  </ULink>
  <div v-else class="w-full h-[50px] sm:h-[100px] md:h-[130px] lg:h-[150px] xl:h-[180px] rounded-md md:rounded-2xl overfloe-hidden bg-green"></div>
</template>
<script setup>
const props = defineProps({
  ad: {
    type: Object,
  }
})
</script>
<style></style>
