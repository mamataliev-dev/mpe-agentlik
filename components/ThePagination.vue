<template>
  <div>
    <UPagination
      v-model="page"
      :pageCount="20"
      :total="items"
      :ui="{
        wrapper: 'flex items-center gap-x-2',
        rounded: 'rounded-lg',
        default: {
          size: 'xl',
          activeButton: {
            class:
              'flex items-center justify-center shadow-none ring-1 text-base font-normal ring-green hover:text-white hover:bg-green text-green bg-transparent w-[40px] h-[40px]',
          },
          inactiveButton: {
            class:
              'flex items-center justify-center shadow-none ring-1 text-base font-normal ring-white-01 text-dark-green bg-transparent w-[40px] h-[40px] bg-white-01',
          },
        },
      }"
    >
      <template #prev="{ onClick }">
        <UButton
          icon="i-heroicons-chevron-left"
          color="white"
          size="xl"
          :ui="{ rounded: 'rounded-lg', icon: { size: { xl: 'h-4 w-4' }} }"
          class="flex items-center justify-center ring-1 shadow-none ring-white-222 bg-white text-green-dark w-[42px] h-[42px]"
          @click="onClick"
        />
      </template>

      <template #next="{ onClick }">
        <UButton
          icon="i-heroicons-chevron-right"
          color="white"
          size="xl"
          :ui="{ rounded: 'rounded-lg', icon: { size: { xl: 'h-4 w-4' }} }"
          class="flex items-center justify-center ring-1 shadow-none ring-white-222 bg-white text-green-dark w-[42px] h-[42px]"
          @click="onClick"
        />
      </template>
    </UPagination>
  </div>
</template>

<script setup>
const props = defineProps({
  items: {
    type: Number,
    default: () => 0,
  },
});

const route = useRoute();

const page = ref(parseInt(route.query?.page) || 1);

const emit = defineEmits(['page']);

watch(() => page.value, (newVal) => {
  emit('page', newVal);
  navigateTo({query: {page: newVal}});
});

</script>

<style lang="scss" scoped></style>
