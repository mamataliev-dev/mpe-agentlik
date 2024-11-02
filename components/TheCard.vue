<template>
  <ULink
    :to="localePath(link)"
    class="border group h-full flex flex-col border-white-222 bg-white p-4 rounded-xl"
  >
    <div class="h-[210px] lg:h-[200px] w-full overflow-hidden rounded-md">
      <img
        :src="image"
        :alt="title"
        class="w-full h-full object-cover group-hover:scale-110 duration-200"
      />
    </div>

    <div class="flex flex-col gap-y-4 mt-4 justify-between flex-auto">
      <h3
        class="line-clamp-3 font-semibold text-[14px] lg:text-lg mb-2 group-hover:text-green text-green-dark duration-200"
      >
        {{ title }}
      </h3>

      <div class="flex justify-between items-center mt-auto">
        <p class="text-[12px] lg:text-[14px] flex gap-2 text-grey items-center">
          <i class="i-heroicons-calendar text-lg"></i>{{ date }}
        </p>
        <p class="text-[12px] lg:text-[14px] flex gap-1 text-grey items-center">
          <i class="i-heroicons-eye text-lg"></i>{{ views }}
        </p>
      </div>
    </div>
  </ULink>
</template>

<script setup>
const localePath = useLocalePath();

const props = defineProps({
  link: {
    type: String,
  },
  image: {
    type: String,
  },
  title: {
    type: String,
    default: "Title",
  },
  date: {
    type: String,
    default: "18.04.2024",
  },
  views: {
    default: "800",
  },
});
</script>

<style lang="scss" scoped></style>
