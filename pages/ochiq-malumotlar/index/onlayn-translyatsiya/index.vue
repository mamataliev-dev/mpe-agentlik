<template>
  <div>
    <div class="page-info-block mb-10">
      <p class="text-sm md:text-base">
        {{ translations['openData.streaming_header_text'] }}
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      <ULink
        v-for="result in data?.results"
        :key="result.id"
        :to="result.url"
        target="_blank"
        class="border group flex flex-col border-white-222 bg-white p-4 rounded-xl"
      >
        <div class="h-[200px] w-full overflow-hidden rounded-md">
          <img
            :src="result.image"
            alt="img"
            class="w-full h-full object-cover group-hover:scale-110 duration-200"
          />
        </div>

        <div class="flex flex-col mt-4 justify-between flex-auto">
          <div class="flex justify-between items-center">
            <h3
              class="line-clamp-3 font-semibold text-lg mb-2 group-hover:text-green text-green-dark duration-200"
            >
              {{ result.title }}
            </h3>
            <p class="flex items-center gap-2 text-base text-red">
              Live <span class="h-3 w-3 shrink-0 rounded-full bg-red"></span>
            </p>
          </div>
          <div class="flex justify-between items-center mt-auto">
            <p class="flex gap-2 text-grey items-center">{{ result.date }}</p>
          </div>
        </div>
      </ULink>
    </div>

    <div v-if="data.count > 20" class="mt-[40px] flex justify-end">
      <ThePagination :items="data.count" @page="updatePage" />
    </div>

    <div class="page-info-block mt-10 lg:mt-16 lg:mb-0 mb-4">
      <p class="text-sm md:text-base">
        {{ translations['openData.streaming_footer_text'] }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { usePage } from "~/stores/page";
import { useDocuments } from "~/stores/documents";
import { useTranslation } from '~/stores/translations';

const { translations } = storeToRefs(useTranslation());

const { data } = await useAsyncData('openSourceDocumentsStreaming', () => useDocuments().getDocuments('/streams'));

const page = usePage();

// const localePath = useLocalePath();

useHead({
  title: () => `MPE.UZ | ${translations.value["header.online_streaming"]}`,
});

const emits = defineEmits(["isPostPage"]);

const updatePage = async (page) => {
  data.value = await useDocuments().getDocuments('/streams', { page });
  if(process.client) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
};

onMounted(() => {
  emits("isPostPage", false);
  page.setTitle(translations.value["header.online_streaming"]);
});
</script>


<!-- :to="localePath(`/ochiq-malumotlar/onlayn-translyatsiya/` + item)" -->
<style lang="scss" scoped></style>
