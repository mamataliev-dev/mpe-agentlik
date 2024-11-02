<template>
  <div>
    <div class="page-info-block mb-10">
      <p class="text-[14px] md:text-[16px]">
        {{ translations['education.library_header_text'] }}
      </p>
    </div>

    <div>
      <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        <div v-for="book in data.results" :key="book.id"
          class="flex flex-col gap-y-4 bg-white min-h-[362px] lg:min-h-[489px] rounded-br-8 p-4 lg:p-6">
          <img class="w-full h-[210px] object-cover lg:h-[315px] rounded-xl" :src="book.image" :alt="book.title" />

          <span class="font-semibold line-clamp-3 text-base lg:text-lg">
            {{ book.title }}
          </span>

          <div class="flex items-center gap-x-[12px] mt-auto">
            <UButton @click="downloadFile(book.file)" size="sm" :ui="{ rounded: 'rounded-full' }" variant="ghost" class="p-0">
              <template #leading>
                <img src="@/assets/img/icons/library-download.svg" alt="View" />
              </template>
            </UButton>

            <UButton :to="book.file" target="_blank" size="sm" :ui="{ rounded: 'rounded-full' }" variant="ghost"
              class="p-0">
              <template #leading>
                <img src="@/assets/img/icons/library-view.svg" alt="View" />
              </template>
            </UButton>
          </div>
        </div>
      </div>
      <div class="mt-10 flex justify-end">
        <ThePagination :items="data.count" @page="updatePage" />
      </div>

      <div class="bg-white-222 rounded-br-8 p-6 mt-20">
        <p class="text-black">
          {{ translations['education.library_second_footer_text'] }}
        </p>
      </div>
    </div>

    <div class="page-info-block mt-10 lg:mt-16 lg:mb-0 mb-4">
      <p class="text-[14px] md:text-[16px]">
        {{ translations['education.library_footer_text'] }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { usePage } from "~/stores/page";
import { useEducation } from "~/stores/education";
import { useTranslation } from '~/stores/translations';

const route = useRoute();

const { translations } = storeToRefs(useTranslation());
const { data } = await useAsyncData('educationEBooks', () => useEducation().getEducation('/books', {page: route.query?.page || 1}));

useHead({
  title: () => `MPE.UZ | ${translations.value["header.e_library"]}`,
});

const downloadFile = (url) => {
  const link = document.createElement('a')
  link.href = url;
  link.download = url;
  link.target = '_blank'
  link.click()
}

const page = usePage();

const emits = defineEmits(["isPostPage"]);

const updatePage = async (page) => {
  data.value = await useEducation().getEducation('/books', {page})
  if(process.client) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
};

onMounted(() => {
  emits("isPostPage", false);
  page.setTitle(translations.value["header.e_library"]);
});
</script>

<style lang="scss" scoped></style>
