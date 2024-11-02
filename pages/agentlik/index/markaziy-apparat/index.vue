<template>
  <div>
    <div class="page-info-block mb-10">
      <p class="text-[14px] md:text-[16px]">
        {{ translations['agency.apparatus_header_text'] }}
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-[16px]">
      <AgentlikCard
        v-for="result in data.results"
        :key="result.id"
        :data="result"
        @click="$router.push(localePath(`/agentlik/markaziy-apparat/${result?.slug}`))"
      />
    </div>
    <div v-if="data.count > 20" class="mt-[40px] flex justify-end">
      <ThePagination :items="data.count" @page="updatePage" />
    </div>
    <div class="page-info-block mt-10 lg:mt-16 lg:mb-0 mb-4">
      <p class="text-[14px] md:text-[16px]">
        {{ translations['agency.apparatus_footer_text'] }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { usePage } from "~/stores/page";
import { useAgency } from "~/stores/agency";
import { useTranslation } from '~/stores/translations';

const { translations } = storeToRefs(useTranslation());
const { data } = await useAsyncData('centralAppratus', () => useAgency().getAgency('/central_apparatus'));

const localePath = useLocalePath();

useHead({
  title: () => `MPE.UZ | ${translations.value['header.central_apparatus']}`,
});

const page = usePage();
const emits = defineEmits(["isPostPage"]);

const updatePage = async (page) => {
  data.value = await useAgency().getAgency('/central_apparatus', { page });
  if(process.client) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
};

onMounted(() => {
  emits("isPostPage", false);
  page.setTitle(translations.value['header.central_apparatus']);
});
</script>

<style lang="scss" scoped></style>
