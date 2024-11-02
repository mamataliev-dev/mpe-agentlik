<template>
  <div class="bg-white rounded-br-12 mb-4">
    <div class="p-4 lg:p-6 border-b border-borderColor">
      <h2 class="font-medium text-[16px] lg:text-[20px] text-green-dark">
        {{ title }}
      </h2>
    </div>

    <ul class="p-3 flex flex-col gap-1">
      <li v-for="(item, index) in links" :key="item.slug">
        <ULink
          :to="item.slug"
          active-class="block text-[14px] lg:text-base px-4 py-3 rounded-br-8 bg-green-light text-green"
          exact-active-class="block text-[14px] lg:text-base px-4 py-3 rounded-br-8 bg-green-light text-green"
          inactive-class="block text-[14px] lg:text-base px-4 py-3 text-grey-0 rounded-br-8 hover:bg-green-light hover:text-green transition-all duration-200 ease-in-out"
        >
          {{ item.title }}
        </ULink>
      </li>
    </ul>
  </div>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    default: "Title",
  },
  links: {
    type: Array,
    default: () => [],
  },
});
</script>

<style lang="scss" scoped></style>
