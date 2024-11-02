<template>
  <div>
    <div class="page-info-block mb-10">
      <p class="text-[14px] md:text-[16px]">
        {{ translations['services.map_header_text'] }}
      </p>
    </div>

    <div class="h-[432px] rounded-2xl overflow-hidden" v-html="staticData?.map">
    </div>

    <div class="page-info-block mt-10 lg:mt-16 lg:mb-0 mb-4">
      <p class="text-[14px] md:text-[16px]">
        {{ translations['services.map_header_text'] }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { useStatic } from '~/stores/static';
import { usePage } from "~/stores/page";
import { useTranslation } from '~/stores/translations';

const { translations } = storeToRefs(useTranslation());
const { staticData } = useStatic();

useHead({
  title: () => `MPE.UZ | ${translations.value["header.map"]}`,
});

const page = usePage();
const emits = defineEmits(["isPostPage"]);

onMounted(() => {
  emits("isPostPage", false);
  page.setTitle(translations.value["header.map"]);
});
</script>

<style lang="scss" scoped></style>
