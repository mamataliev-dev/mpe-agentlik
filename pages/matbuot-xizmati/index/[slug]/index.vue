<template>
  <div>
    <div class="page-info-block mb-10">
      <p v-if="route.params.slug == 'barchasi'" class="text-sm md:text-base">
        {{ translations['press.everything_header_text'] }}
      </p>
      <p v-else v-html="data.text.text_header" class="text-sm md:text-base"></p>
    </div>

    <div>
      <div class="cards-grid">
        <TheCard
          v-for="result in data.news.results"
          :link="`/matbuot-xizmati/${route.params.slug}/${result.slug}`"
          :image="result.image"
          :title="result.title"
          :date="result.created_at"
          :views="result.views"
          :key="result.id"
        />
      </div>

      <div class="mt-[40px] flex justify-end">
        <ThePagination :items="data.news.count" @page="updatePage" />
      </div>
    </div>

    <div class="page-info-block mt-10 lg:mt-16 lg:mb-0 mb-4">
      <p v-if="route.params.slug == 'barchasi'" class="text-sm md:text-base">
        {{ translations['press.everything_footer_text'] }}
      </p>
      <p v-else v-html="data.text.text_footer" class="text-sm md:text-base"></p>
    </div>
  </div>
</template>

<script setup>
import { useNews } from "~/stores/news";
import { useTranslation } from '~/stores/translations';

const { translations } = storeToRefs(useTranslation());
const route = useRoute();
const { data } = await useAsyncData('newsSlug', async () => {
  let news = await useNews().getNews('/news', { category__slug: route.params.slug == 'barchasi' ? null : route.params.slug, page: route.query?.page || 1});
  let text;
  if (route.params.slug !== 'barchasi') {
    text = await useNews().getNews(`/news/categories/${route.params.slug}`);
  }

  return { news, text };
});

const emits = defineEmits(["isPostPage"]);

const updatePage = async (page) => {
  data.value.news = await useNews().getNews('/news', { category__slug: route.params.slug == 'barchasi' ? null : route.params.slug, page });
  if(process.client) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
};

onMounted(() => {
  emits("isPostPage", false);
});
</script>

<style lang="scss" scoped></style>
