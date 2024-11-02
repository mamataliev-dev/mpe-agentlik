<template>
  <div>
    <div class="page-info-block mb-10">
      <p class="text-sm md:text-base">
        {{ translations['agency.community_header_text'] }}
      </p>
    </div>

    <div class="bg-white rounded-xl p-4 lg:p-8">
      <UInput @input="debouncedInput" v-model="search" class="grow" :ui="{
        padding: { xl: 'px-6 py-4' },
        rounded: 'rounded-xl',
        color: { white: { outline: 'shadow-none ring-white-222' } },
      }" color="white" icon="i-heroicons-magnifying-glass-20-solid" size="xl" :trailing="true"
        :placeholder="translations['header.search']" />
      <div v-if="data.results.length > 0" class="mt-6 space-y-3">
        <div v-for="result in data?.results" :key="result.id"
          class="p-4 md:p-6 rounded-lg bg-white-111 flex items-center gap-2 sm:gap-6">
          <div class="flex flex-col gap-2 grow">
            <h4 class="text-base md:text-xl line-clamp-2">
              {{ result.title }}
            </h4>
            <p class="text-sm md:text-base text-grey">{{ result.created_at }}</p>
          </div>
          <div class="flex gap-2 flex-col sm:flex-row md:gap-4 xl:gap-6">
            <UButton @click="downloadFile(result.file)" icon="i-heroicons-inbox-arrow-down" size="xl" :ui="{
              rounded: 'rounded-full',
              color: { white: { solid: 'shadow-none' } },
            }" color="white" class="ring-white w-12 h-12 flex items-center justify-center text-blue hover:bg-white"
              variant="solid" />
            <UButton target="_blank" :to="result.url" icon="i-heroicons-eye" size="xl" :ui="{
              rounded: 'rounded-full',
              color: { white: { solid: 'shadow-none' } },
            }" color="white" class="ring-white w-12 h-12 flex items-center justify-center text-blue hover:bg-white"
              variant="solid" />
          </div>
        </div>
      </div>
      <div v-else>
        <p class="text-center text-lg text-grey mt-6">
          {{ translations['search.not_found'] }}
        </p>
      </div>
    </div>

    <div v-if="data.count > 20" class="mt-[40px] flex justify-end">
      <ThePagination :items="data.count" @page="updatePage" />
    </div>

    <div class="page-info-block mt-10 lg:mt-16 lg:mb-0 mb-4">
      <p class="text-sm md:text-base">
        {{ translations['agency.community_footer_text'] }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { usePage } from "~/stores/page";
import { useActivities } from "~/stores/activities";
import { useTranslation } from '~/stores/translations';
import { debounce } from '~/utils/debounce'

const { translations } = storeToRefs(useTranslation());
const { data } = await useAsyncData('activitiesReports', () => useActivities().getActivities('/reports'));

const search = ref('');
const route = useRoute();
const page = usePage();
useHead({
  title: () => `MPE.UZ | ${translations.value["header.reports"]}`,
});

const debouncedInput = debounce(async (e) => 
  data.value = await useActivities().getActivities('/reports', { page: route.query?.page || 1, search: e.target.value }),
  300 // timeout in ms
);

const emits = defineEmits(["isPostPage"]);

const updatePage = async (page) => {
  data.value = await useActivities().getActivities('/reports', { page, search: search.value });
  if(process.client) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
};

onMounted(() => {
  emits("isPostPage", false);
  page.setTitle(translations.value["header.reports"]);
});

const downloadFile = (url) => {
  const link = document.createElement('a')
  link.href = url;
  link.download = url;
  link.target = '_blank'
  link.click()
}
</script>

<style lang="scss" scoped></style>
