<template>
  <div class="wrapper page-container">
    <div :class="!isPostPage ? '' : 'lg:w-10/12 mx-auto'">
      <div :class="!isPostPage ? '' : 'items-start lg:flex-row lg:items-center justify-between mb-6'" class="flex flex-col gap-y-3">
        <BreadCrumb />
        <span
          v-if="isPostPage"
          class="shrink-0 text-[12px] lg:text-[1rem] mt-[8px] lg:mt-0 text-[#9A999B]"
          >{{ page.date }}</span
        >
        <h1 v-if="!isPostPage" class="title">{{ page.title }}</h1>
      </div>
      <div class="page-block">
        <SideNav v-show="!isPostPage" class="lg:hidden w-full" :links="sideBarLinks" :title="translations['header.open_data']" />
        <NuxtPage @isPostPage="isPostPageTrigger" :class="!isPostPage ? 'lg:w-9/12' : ''" class="w-full" />
        <div v-if="!isPostPage" class="w-full lg:w-3/12 flex flex-col sticky top-24">
          <SideNav v-show="!isPostPage" class="hidden lg:block" :links="sideBarLinks" :title="translations['header.open_data']" />
          <SideRate />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { usePage } from "~/stores/page";
import { useDocuments } from "~/stores/documents";
import { useTranslation } from '~/stores/translations';

const { translations } = storeToRefs(useTranslation());
const { data } = await useAsyncData('opensourseDocuments', () => useDocuments().getDocuments('/opensourse_documents/categories'));

const route = useRoute();
const page = usePage();

const sideBarLinks = computed(() => [
  {
    title: translations.value["header.everything"],
    slug: "barchasi",
  },
  ...data.value?.results,
  {
    title: translations.value["header.online_streaming"],
    slug: "onlayn-translyatsiya",
  },
]);

const updateTitle = () => {
  if (data.value?.results?.length > 0) {
    const newSlug = route.params.slug;
    const item =sideBarLinks.value.find((item) => item.slug === newSlug);
    if (item) {
      const title = item.title;
      page.setTitle(title);
      useHead({
        title: `MPE.UZ | ${title}`
      });
    } else {
      page.setTitle(translations.value["header.open_data"]);
      useHead({
        title: 'MPE.UZ'
      });
    }
  }
};

// Watch for changes in route.params.slug and data
watch([() => route.params.slug, data], () => {
  updateTitle();
}, { immediate: true });

const isPostPage = ref(false);

const isPostPageTrigger = (val) => {
  isPostPage.value = val;
};

if (route.params.id) {
  isPostPageTrigger(true);
}
</script>

<style scoped></style>
