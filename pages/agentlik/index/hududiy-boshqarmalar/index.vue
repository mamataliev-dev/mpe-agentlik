<template>
  <div>
    <div class="page-info-block mb-10">
      <p class="text-[14px] md:text-[16px]">
        {{ translations['agency.regional_header_text'] }}
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <AgentlikCard
        v-for="result in data.results"
        :key="result.id"
        :data="result"
        @click="$router.push(localePath(`/agentlik/hududiy-boshqarmalar/${result.slug}`))"
      />
    </div>
    <div v-if="data.count > 20" class="mt-[40px] flex justify-end">
      <ThePagination :items="data.count" @page="updatePage" />
    </div>
    <div class="page-info-block mt-16 md:mt-10 mb-0 md:mb-4">
      <p class="text-[14px] md:text-[16px]">
        {{ translations['agency.regional_footer_text'] }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { usePage } from "~/stores/page";
import { useAgency } from "~/stores/agency";
import { useTranslation } from '~/stores/translations';

const { translations } = storeToRefs(useTranslation());
const { data } = await useAsyncData('centralAppratus', () => useAgency().getAgency('/regional_administrations'));

const localePath = useLocalePath();

useHead({
  title: () => `MPE.UZ | ${translations.value['header.regional_administrations']}`,
});

const page = usePage();
const emits = defineEmits(["isPostPage"]);

const updatePage = async (page) => {
  data.value = await useAgency().getAgency('/regional_administrations', { page });
  if(process.client) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
};

onMounted(() => {
  emits("isPostPage", false);
  page.setTitle(translations.value['header.regional_administrations']);
});
</script>

<style lang="scss" scoped></style>
