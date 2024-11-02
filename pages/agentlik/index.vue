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
        <SideNav v-show="!isPostPage" class="lg:hidden w-full" :links="sideBarLinks" :title="translations['header.agency']" />
        <NuxtPage @isPostPage="isPostPageTrigger" :class="!isPostPage ? 'lg:w-9/12' : ''" class="w-full" />
        <div v-if="!isPostPage" class="w-full lg:w-3/12 flex flex-col sticky top-24">
          <SideNav v-show="!isPostPage" class="hidden lg:block" :links="sideBarLinks" :title="translations['header.agency']" />
          <SideRate />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { usePage } from "~/stores/page";
import { useTranslation } from '~/stores/translations';

const { translations } = storeToRefs(useTranslation());

const route = useRoute();
const page = usePage();
const localePath = useLocalePath();
const sideBarLinks = computed(() => [
  {
    title: translations.value['header.about_agency'],
    slug: localePath("/agentlik/agentlik-haqida"),
  },
  {
    title: translations.value['header.leadership'],
    slug: localePath("/agentlik/rahbariyat"),
  },
  {
    title: translations.value['header.central_apparatus'],
    slug: localePath("/agentlik/markaziy-apparat"),
  },
  {
    title: translations.value['header.regional_administrations'],
    slug: localePath("/agentlik/hududiy-boshqarmalar"),
  },
  {
    title: translations.value['header.community_council'],
    slug: localePath("/agentlik/jamoatchilik-kengashi"),
  },
]);

page.setTitle(sideBarLinks.value.find((item) => item.slug === route.path)?.title || translations.value['header.agency']);

const isPostPage = ref(false);

const isPostPageTrigger = (val) => {
  isPostPage.value = val;
};

if (route.path.includes('/jamoatchilik-kengashi/') && route.params.id) {
  isPostPageTrigger(true);
}

watch([() => page.pageTitle, () => route.params.id], ([newPageTitle, newRouteId]) => {
  if (newRouteId) {
    useHead({
      title: `MPE.UZ | ${newPageTitle}`
    });
  }
}, { immediate: true });

</script>

<style lang="scss" scoped></style>
