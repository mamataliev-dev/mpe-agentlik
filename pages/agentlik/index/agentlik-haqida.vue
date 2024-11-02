<template>
  <div>
    <div class="page-info-block mb-10">
      <p class="text-[14px] md:text-[16px]">
        {{ translations['agency.about_header_text'] }}
      </p>
    </div>

    <div class="bg-white rounded-br-16 p-3 md:p-8">
      <div class="flex flex-col gap-y-4">
        <img
          class="rounded-br-8"
          :src="data?.image"
          alt=""
        />

        <span class="subtitle" v-html="data?.short_text"></span>
      </div>

      <div class="flex flex-col gap-y-6 mt-4 md:mt-8">
        <h2 class="text-green-dark font-medium text-[1rem] md:text-[1.5rem]">
          {{ data?.title }}:
        </h2>

        <span class="subtitle" v-html="data?.text"></span>

        <!-- <ul class="flex flex-col gap-y-4">
          <li class="flex items-start gap-x-[8px]">
            <div
              class="mt-[10px] shrink-0 w-[8px] h-[8px] rounded-full bg-green"
            ></div>
            <span class="subtitle"
              >birinchisi, maktabgacha ta'lim sohasida yagona davlat siyosatini
              ishlab chiqish va amalda amalga oshirish;</span
            >
          </li>
        </ul> -->
      </div>
    </div>

    <div class="page-info-block mt-10 lg:mt-16 lg:mb-0 mb-4">
      <p class="text-[14px] md:text-[16px]">
        {{ translations['agency.about_footer_text'] }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { usePage } from "~/stores/page";
import { useAgency } from "~/stores/agency";
import { useTranslation } from '~/stores/translations';

const { translations } = storeToRefs(useTranslation());
const { data } = await useAsyncData('about', () => useAgency().getAgency('/about_agensy'));

useHead({
  title: () => `MPE.UZ | ${translations.value['header.about_agency']}`,
});

const page = usePage();
const emits = defineEmits(["isPostPage"]);


onMounted(() => {
  emits("isPostPage", false);
  page.setTitle(translations.value['header.about_agency']);
});
</script>

<style lang="scss" scoped></style>
