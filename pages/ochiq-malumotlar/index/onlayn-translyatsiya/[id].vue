<template>
  <div>
    <div>
      <div class="flex flex-col justify-between space-y-3 mb-[24px]">
        <h1>{{ page.title }}</h1>
      </div>

      <div class="bg-white rounded-br-16 lg:px-10 p-4 lg:p-8">
        <p class="text-lg md:text-xl">Bektemir tumani MMT lari dagi kamera kuzatuvlari:</p>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8">
          <ULink
            v-for="item in 8"
            :key="item"
            :to="localePath(`/ochiq-malumotlar/onlayn-translyatsiya/` + item)"
            class="border group flex flex-col border-white-222 bg-white p-4 rounded-xl"
          >
            <div class="h-[150px] w-full overflow-hidden rounded-md">
              <img
                src="~/assets/img/jpg/test-image.jpg"
                alt="img"
                class="w-full h-full object-cover group-hover:scale-110 duration-200"
              />
            </div>

            <div class="flex flex-col mt-4 justify-between flex-auto">
              <div class="flex justify-between items-center">
                <h3
                  class="line-clamp-3 font-semibold text-lg mb-2 group-hover:text-green text-green-dark duration-200"
                >
                  Bektemir tumani
                </h3>
                <p class="flex items-center gap-2 text-base text-red">
                  Live
                  <span class="h-3 w-3 shrink-0 rounded-full bg-red"></span>
                </p>
              </div>
              <div class="flex justify-between items-center mt-auto">
                <p class="flex gap-2 text-grey items-center">2024-09-15</p>
              </div>
            </div>
          </ULink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { usePage } from "~/stores/page";

const page = usePage();
const localePath = useLocalePath();

useHead({
  title: "MPE.UZ | Bektemir tumani",
});


const emits = defineEmits(["isPostPage"]);

onMounted(() => {
  emits("isPostPage", true);
  page.setTitle("Bektemir tumani");
  // page.definePageTitle(data?.value?.title);
  // page.definePageDate(data?.value?.created_at);
});
</script>

<style lang="scss" scoped></style>
