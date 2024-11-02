<template>
  <div>
    <div class="page-info-block mb-10">
      <p v-if="route.params.slug == 'barchasi'" class="text-sm md:text-base">
        {{ translations['documents.everything_header_text'] }}
      </p>
      <p v-else v-html="data.text.text_header" class="text-sm md:text-base"></p>
    </div>

    <div class="bg-white rounded-xl p-4 lg:p-8">
      <UInput
        v-model="search"
        @input="debouncedInput"
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
      <div v-if="data.documents.results.length > 0" class="mt-6 space-y-3">
        <div
          v-for="result in data.documents.results"
          :key="result.id"
          class="p-4 md:p-6 rounded-lg bg-white-111 flex items-center gap-2 sm:gap-6"
        >
          <UButton
            icon="i-heroicons-document-text"
            size="xl"
            :ui="{
              rounded: 'rounded-full',
              color: { white: { solid: 'shadow-none' } },
            }"
            color="white"
            class="hidden sm:flex ring-white w-12 h-12 items-center justify-center text-blue hover:bg-white"
            variant="solid"
          />
          <div class="flex flex-col gap-2 grow">
            <h4 class="text-base md:text-xl line-clamp-2">
              {{ result.title }}
            </h4>
            <p class="text-sm md:text-base text-grey">№ {{ result.code }} {{ result.date }}</p>
          </div>
          <UButton
            target="_blank"
            :to="result.url"
            icon="i-heroicons-eye"
            size="xl"
            :ui="{
              rounded: 'rounded-full',
              color: { white: { solid: 'shadow-none' } },
            }"
            color="white"
            class="ring-white w-12 h-12 flex items-center justify-center text-green-dark hover:bg-white"
            variant="solid"
          />
        </div>
      </div>
      <div v-else>
        <p class="text-center text-lg text-grey mt-6">
          {{ translations['search.not_found'] }}
        </p>
      </div>
    </div>

    <div v-if="data.documents.count > 20" class="mt-[40px] flex justify-end">
      <ThePagination :items="data.documents.count" @page="updatePage" />
    </div>

    <div class="page-info-block mt-10 lg:mt-16 lg:mb-0 mb-4">
      <p v-if="route.params.slug == 'barchasi'" class="text-sm md:text-base">
        {{ translations['documents.everything_footer_text'] }}
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

const { data } = await useAsyncData('documentsSlug', async () => {
  let documents = await useDocuments().getDocuments('/documents', { category__slug: route.params.slug == 'barchasi' ? null : route.params.slug });
  let text;
  if (route.params.slug !== 'barchasi') {
    text = await useDocuments().getDocuments(`/documents/categories/${route.params.slug}`);
  }
  return { documents, text };
});

const debouncedInput = debounce(async (e) => 
  data.value.documents = await useDocuments().getDocuments('/documents', { category__slug: route.params.slug == 'barchasi' ? null : route.params.slug, search: e.target.value, page: route.query?.page || 1 }),
  300 // timeout in ms
);

const updatePage = async (page) => {
  data.value.documents = await useDocuments().getDocuments('/documents', { category__slug: route.params.slug == 'barchasi' ? null : route.params.slug, page, search: search.value });
  if(process.client) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
};

const emits = defineEmits(["isPostPage"]);

onMounted(() => {
  emits("isPostPage", false);
});
</script>

<style lang="scss" scoped></style>
