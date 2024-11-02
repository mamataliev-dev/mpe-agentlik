<template>
  <div>
    <div class="page-info-block mb-10">
      <p v-if="route.params.slug == 'barchasi'" class="text-sm md:text-base">
        {{ translations['openData.everything_header_text'] }}
      </p>
      <p v-else v-html="data.text.text_header" class="text-sm md:text-base"></p>
    </div>

    <div class="bg-white rounded-xl p-4 lg:p-8">
      <!-- <h2 class="text-lg mb-6">
        OCHIQ MAʼLUMOTLAR SIFATIDA JOYLASHTIRILISHI KERAK BO‘LGAN IJTIMOIY
        AHAMIYATGA MOLIK MAʼLUMOTLAR RO‘YXATI (PF-6247)
      </h2> -->
      <UInput
        @input="debouncedInput"
        v-model="search"
        class="grow"
        :ui="{
          padding: { xl: 'px-6 py-4' },
          rounded: 'rounded-xl',
          color: { white: { outline: 'shadow-none ring-white-222' } },
        }"
        color="white"
        icon="i-heroicons-magnifying-glass-20-solid"
        size="xl"
        :trailing="true"
        :placeholder="translations['header.search']"
      />
      <div v-if="data.openData.results.length > 0" class="mt-6 space-y-3">
        <div
          v-for="result in data.openData.results"
          :key="result.id"
          class="p-4 md:p-6 rounded-lg bg-white-111 flex items-center gap-2 sm:gap-6"
        >
          <div class="flex flex-col gap-2 grow">
            <h4 class="text-base md:text-xl line-clamp-2">
              {{ result.title }}
            </h4>
            <p class="text-sm md:text-base text-grey">{{ result.created_at }}</p>
          </div>
          <div class="flex gap-2 flex-col sm:flex-row md:gap-4 xl:gap-6">
          <UButton
            @click="downloadFile(result.file)"
            icon="i-heroicons-inbox-arrow-down"
            size="xl"
            :ui="{
              rounded: 'rounded-full',
              color: { white: { solid: 'shadow-none' } },
            }"
            color="white"
            class="ring-white w-12 h-12 flex items-center justify-center text-green-dark hover:bg-white"
            variant="solid"
          />
          <UButton
            target="_blank"
            :to="result.url"
            :icon="
              result.id % 2 === 0 ? 'i-heroicons-document-text' : 'i-heroicons-link'
            "
            size="xl"
            :class="{
              'text-blue': result.id % 2 === 0,
              'text-green': result.id % 2 !== 0,
            }"
            :ui="{
              rounded: 'rounded-full',
              color: { white: { solid: 'shadow-none' } },
            }"
            color="white"
            class="ring-white w-12 h-12 flex items-center justify-center hover:bg-white"
            variant="solid"
          />
          </div>
        </div>
      </div>
      <div v-else >
        <p class="text-center text-lg text-grey mt-6">
          {{ translations['search.not_found'] }}
        </p>
      </div>
    </div>

    <div v-if="data.openData.count > 20" class="mt-[40px] flex justify-end">
      <ThePagination :items="data.openData.count" @page="updatePage" />
    </div>

    <div class="page-info-block mt-10 lg:mt-16 lg:mb-0 mb-4">
      <p v-if="route.params.slug == 'barchasi'" class="text-sm md:text-base">
        {{ translations['openData.everything_footer_text'] }}
      </p>
      <p v-else v-html="data.text.text_footer" class="text-sm md:text-base"></p>
    </div>
  </div>
</template>

<script setup>
import { useDocuments } from "~/stores/documents";
import { useTranslation } from '~/stores/translations';
import { debounce } from '~/utils/debounce'

const { translations } = storeToRefs(useTranslation());

const route = useRoute();
const search = ref('');

const { data } = await useAsyncData('opensourseDocumentsSlug', async () => {
  let openData = await useDocuments().getDocuments('/opensourse_documents', { category__slug: route.params.slug == 'barchasi' ? null : route.params.slug });
  let text;
  if (route.params.slug !== 'barchasi') {
    text = await useDocuments().getDocuments(`/opensourse_documents/categories/${route.params.slug}`);
  }

  return { openData, text };
});

const debouncedInput = debounce(async (e) => 
  data.value.openData = await useDocuments().getDocuments('/opensourse_documents', { category__slug: route.params.slug == 'barchasi' ? null : route.params.slug, search: e.target.value, page: route.query?.page || 1 }),
  300 // timeout in ms
);

const downloadFile = (url) => {
  const link = document.createElement('a')
  link.href = url;
  link.download = url;
  link.target = '_blank'
  link.click()
}

const emits = defineEmits(["isPostPage"]);

const updatePage = async (page) => {
  data.value.openData = await useDocuments().getDocuments('/opensourse_documents', { category__slug: route.params.slug == 'barchasi' ? null : route.params.slug, page, search: search.value });
  if(process.client) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
};

onMounted(() => {
  emits("isPostPage", false);
});
</script>

<style lang="scss" scoped></style>
