<template>
  <div>
    <div class="page-info-block mb-10">
      <p class="text-[14px] md:text-[16px]">
        {{ translations['agency.community_header_text'] }}
      </p>
    </div>

    <div
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4"
    >
      <ULink
        :to="localePath(`/agentlik/jamoatchilik-kengashi/${data?.results[0].slug}`)"
        class="group col-span-1 md:col-span-2 overflow-hidden relative rounded-br-12 max-h-[380px]"
      >
        <div class="absolute w-full h-full bg-black opacity-30 z-[4]"></div>
        <img
          class="w-full h-full lg:h-full object-cover rounded-br-12 group-hover:scale-110 duration-200"
          :src="data?.results[0].image"
          alt=""
        />

        <div class="absolute bottom-4 left-4 lg:bottom-8 lg:left-8 z-[99]">
          <p
            class="group-hover:text-green duration-200 text-white mt-auto text-sm lg:text-lg font-medium"
          >
            {{ data?.results[0].title }}
          </p>

          <span class="text-[12px] lg:text-[1rem] text-white">{{ data?.results[0].created_at }}</span>
        </div>
      </ULink>

      <TheCard
        v-for="result in data.results.slice(1)"
        :link="`/agentlik/jamoatchilik-kengashi/${result.slug}`"
        :image="result.image"
        :title="result.title"
        :date="result.created_at"
        :views="result.views"
        :key="result.id"
      />
    </div>

    <div v-if="data.count > 20" class="mt-[40px] flex justify-end">
      <ThePagination :items="data.count" @page="updatePage" />
    </div>

    <div class="page-info-block mt-10 lg:mt-16 lg:mb-0 mb-4">
      <p class="text-[14px] md:text-[16px]">
        {{ translations['agency.community_footer_text'] }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { usePage } from "~/stores/page";
import { useAgency } from "~/stores/agency";
import { useTranslation } from '~/stores/translations';

const { translations } = storeToRefs(useTranslation());
const localePath = useLocalePath();

const { data } = await useAsyncData('communityCouncil', () => useAgency().getAgency('/community_council'));


useHead({
  title: () => `MPE.UZ | ${translations.value['header.community_council']}`,
});

const page = usePage();
const emits = defineEmits(["isPostPage"]);

const updatePage = async (page) => {
  data.value = await useAgency().getAgency('/community_council', { page });
  if(process.client) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
};

onMounted(() => {
  emits("isPostPage", false);
  page.setTitle(translations.value['header.community_council']);
});
</script>

<style lang="scss" scoped></style>
