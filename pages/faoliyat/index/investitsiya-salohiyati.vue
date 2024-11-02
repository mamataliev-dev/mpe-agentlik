<template>
  <div>
    <div class="page-info-block mb-10">
      <p class="text-sm md:text-base">
        {{ translations['activity.investment_header_text'] }}
      </p>
    </div>

    <div class="bg-white rounded-br-16 p-[32px]">
      <div class="flex flex-col gap-y-[16px] h-[600px]">
        <img
          class="h-full w-full object-cover rounded-br-8"
          :src="data?.image"
          :alt="data?.title"
        />

        <span v-html="data.short_text" class="text-[#5D5D5F]">
        </span>
      </div>

      <div class="flex flex-col gap-y-[24px] mt-[32px]">
        <h2>
          {{ data?.title }}
        </h2>

        <span class="subtitle" v-html="data?.text"></span>

        <!-- <ul class="flex flex-col gap-y-[16px]">
          <li class="flex items-start gap-x-[8px]">
            <div
              class="mt-[10px] shrink-0 w-[8px] h-[8px] rounded-full bg-green"
            ></div>
            <span class="text-[#5D5D5F]"
              >birinchisi, maktabgacha ta'lim sohasida yagona davlat siyosatini
              ishlab chiqish va amalda amalga oshirish;</span
            >
          </li>
        </ul> -->
      </div>
    </div>

    <div class="page-info-block mt-10 lg:mt-16 lg:mb-0 mb-4">
      <p class="text-sm md:text-base">
        {{ translations['activity.investment_footer_text'] }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { usePage } from "~/stores/page";
import { useActivities } from "~/stores/activities";
import { useTranslation } from '~/stores/translations';

const { translations } = storeToRefs(useTranslation());
const { data } = await useAsyncData('activitiesInvestment', () => useActivities().getActivities('/investment_potential'));

const page = usePage();
useHead({
  title: () => `MPE.UZ | ${translations.value["header.investment_potential"]}`,
});

const emits = defineEmits(["isPostPage"]);

onMounted(() => {
  emits("isPostPage", false);
  page.setTitle(translations.value["header.investment_potential"]);
});
</script>

<style lang="scss" scoped></style>
