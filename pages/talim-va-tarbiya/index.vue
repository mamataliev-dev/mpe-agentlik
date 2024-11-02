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
        <SideNav v-show="!isPostPage" class="lg:hidden w-full" :links="sideBarLinks" :title="translations['header.education']" />
        <NuxtPage @isPostPage="isPostPageTrigger" :class="!isPostPage ? 'lg:w-9/12' : ''" class="w-full" />
        <div v-if="!isPostPage" class="w-full lg:w-3/12 flex flex-col sticky top-24">
          <SideNav v-show="!isPostPage" class="hidden lg:block" :links="sideBarLinks" :title="translations['header.education']" />
          <SideRate />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { usePage } from "~/stores/page";
import { useEducation } from "~/stores/education";
import { useTranslation } from '~/stores/translations';

const { translations } = storeToRefs(useTranslation());
const { data } = await useAsyncData('education', () => useEducation().getEducation('/education/categories'));

const route = useRoute();
const page = usePage();

const sideBarLinks = computed(() => [
  ...data.value?.results,
  {
    title: translations.value["header.e_library"],
    slug: "elektron-kutubxona",
  },
]);

const isPostPage = ref(false);

const isPostPageTrigger = (val) => {
  isPostPage.value = val;
};

if (route.params.id) {
  isPostPageTrigger(true);
}

const updateTitle = () => {
  if (data.value?.results?.length > 0) {
    const newSlug = route.params.slug;
    const item = sideBarLinks.value.find((item) => item.slug === newSlug);
    if (item) {
      const title = item.title;
      page.setTitle(title);
      useHead({
        title: `MPE.UZ | ${title}`
      });
    } else {
      page.setTitle(translations.value["header.education"]);
      useHead({
        title: `MPE.UZ | ${translations.value["header.education"]}`
      });
    }
  }
};

// Watch for changes in route.params.slug and data
watch([() => route.params, data], () => {
  if (!route.params.id) {
    updateTitle();
  }
}, { immediate: true });

// Assuming page.pageTitle is a reactive property
const pageTitle = computed(() => page.pageTitle);
const routeId = computed(() => route.params.id);

watch([pageTitle, routeId], ([newPageTitle, newRouteId]) => {
  if (newRouteId) {
    useHead({
      title: `MPE.UZ | ${newPageTitle}`
    });
  }
}, { immediate: true });

</script>

<style lang="scss" scoped></style>
