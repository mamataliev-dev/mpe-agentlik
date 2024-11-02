<template>
  <div>
    <div class="page-info-block mb-10">
      <p class="text-[14px] md:text-[16px]">
        {{ translations['services.faq_header_text'] }}
      </p>
    </div>

    <div>
      <UAccordion
        :items="data.results"
        :ui="{
          item: {
            base: 'w-full bg-white text-start px-4 pb-4 lg:px-6 lg:pb-6 pt-0 rounded-b-[8px]',
            icon: 'text-xl shrink-0',
          },
          default: {
            openIcon: 'i-heroicons-arrow-down-circle',
            class:
              'w-full bg-white hover:bg-white text-start rounded-t-[8px] font-medium p-4 lg:p-6 text-[14px] lg:text-[18px] text-green-dark',
          },
        }"
        class="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <template #item="{ item }" class="bg-white">
          <ClientOnly>
            <p v-html="item.answer" class="text-green-dark text-[12px] lg:text-base">
            </p>
          </ClientOnly>
        </template>
      </UAccordion>
    </div>

    <div v-if="data.count > 20" class="mt-[40px] flex justify-end">
      <ThePagination :items="data.count" @page="updatePage" />
    </div>

    <div class="page-info-block mt-10 lg:mt-16 lg:mb-0 mb-4">
      <p class="text-[14px] md:text-[16px]">
        {{ translations['services.faq_footer_text'] }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { usePage } from "~/stores/page";
import { useServices } from "~/stores/services";
import { useTranslation } from '~/stores/translations';

const { translations } = storeToRefs(useTranslation());
const { data } = await useAsyncData('servicesMostAskedQuestions', async () => {
  let res = await useServices().getServices('/faqs')
  return {results: res?.results.map((item) => ({
    label: item.question,
    answer: item.answer
  })), count: res?.count}
});

useHead({
  title: () => `MPE.UZ | ${translations.value["header.faq"]}`,
});

const page = usePage();
const emits = defineEmits(["isPostPage"]);

const updatePage = async (page) => {
  let res = await useServices().getServices('/faqs', { page });
  data.value = {results: res?.results.map((item) => ({
    label: item.question,
    answer: item.answer
  })), count: res?.count};
  if(process.client) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
};

onMounted(() => {
  emits("isPostPage", false);
  page.setTitle(translations.value["header.faq"]);
});
</script>

<style lang="scss" scoped></style>
