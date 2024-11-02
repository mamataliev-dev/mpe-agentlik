<template>
  <div class="wrapper page-container">
    <div :class="!isPostPage ? '' : 'lg:w-10/12 mx-auto'">
      <div :class="!isPostPage ? '' : 'items-start lg:flex-row lg:items-center justify-between mb-6'"
        class="flex flex-col gap-y-3">
        <BreadCrumb />
        <span v-if="isPostPage" class="shrink-0 text-[12px] lg:text-[1rem] mt-[8px] lg:mt-0 text-[#9A999B]">{{ page.date
          }}</span>
        <h1 v-if="!isPostPage" class="title">{{ page.title }}</h1>
      </div>

      <div class="page-block">
        <SideNav v-show="!isPostPage" class="lg:hidden w-full" :links="sideBarLinks"
          :title="translations['header.services']" />
        <NuxtPage @isPostPage="isPostPageTrigger" :class="!isPostPage ? 'lg:w-9/12' : ''" class="w-full" />
        <div v-if="!isPostPage" class="w-full lg:w-3/12 flex flex-col sticky top-24">
          <SideNav v-show="!isPostPage" class="hidden lg:block" :links="sideBarLinks"
            :title="translations['header.services']" />
          <SideRate />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { usePage } from "~/stores/page";
import { useTranslation } from '~/stores/translations';
import { useServices } from "~/stores/services";

const { translations } = storeToRefs(useTranslation());
const { interactive_services } = storeToRefs(useServices());
const localePath = useLocalePath();
const page = usePage();
const route = useRoute();

const sideBarLinks = computed(() => [
  ...interactive_services.value?.results.map((item) => ({
    title: item.title,
    slug: localePath(item.url),
  })),
  {
    title: translations.value["header.appeals"],
    slug: "murojaatlar",
  },
  {
    title: translations.value["header.faq"],
    slug: "kop-beriladigan-savollar",
  },
  {
    title: translations.value["header.my_opinion"],
    slug: "mening-fikrim",
  },
  {
    title: translations.value["header.map"],
    slug: "mttlar-xaritasi",
  }
]);

page.setTitle(sideBarLinks.value.find((item) => route.path.includes(item.slug))?.title || translations.value['header.services']);

const isPostPage = ref(false);

const isPostPageTrigger = (val) => {
  isPostPage.value = val;
};
</script>

<style lang="scss" scoped></style>
