<template>
  <div class="wrapper mt-14 mb-[120px]">
    <div>
      <BreadCrumb />
      <h1>{{ translations['footer.site_map'] }}</h1>
    </div>

    <div class="flex flex-col lg:flex-row items-start gap-x-4 gap-y-4 mt-10">
      <div class="flex flex-col gap-y-4 md:gap-y-8 w-full lg:w-9/12 bg-white rounded-xl p-4 md:p-8">
        <div v-for="(links, idx) in navLinks" :key="idx">
          <h3 class="title">{{ links.label }}</h3>
          <ul class="card" :class="idx + 1 == navLinks.length ? '!border-0' : ''">
            <li v-for="link in links.links[0]" :key="link.to">
              <ULink :to="link.to">
                <span class="link">{{ link.label }}</span>
              </ULink>
            </li>
          </ul>
        </div>
      </div>
      <div class="w-full lg:w-3/12 sticky top-24">
        <SideRate />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useHeader } from "~/stores/header";
import { useServices } from "~/stores/services";
import { useTranslation } from '~/stores/translations';

const { data } = await useAsyncData('header', () => useHeader().getHeader('/header'));

const { translations } = storeToRefs(useTranslation());
const { interactive_services } = storeToRefs(useServices());

const localePath = useLocalePath();

useHead({
  title: () => `MPE.UZ | ${translations.value['footer.site_map']}`,
  meta: () => [
    {
      name: "description",
      content: translations.value['footer.site_map'],
    },
  ],
});

const navLinks = computed(() => [
  {
    label: translations.value['header.agency'],
    links: [
      [
        { label: translations.value['header.about_agency'], to: localePath("/agentlik/agentlik-haqida") },
        { label: translations.value['header.leadership'], to: localePath("/agentlik/rahbariyat") },
        { label: translations.value['header.central_apparatus'], to: localePath("/agentlik/markaziy-apparat") },
        { label: translations.value['header.regional_administrations'], to: localePath("/agentlik/hududiy-boshqarmalar") },
        {
          label: translations.value['header.community_council'],
          to: localePath("/agentlik/jamoatchilik-kengashi"),
        },
      ],
    ],
  },
  {
    label: translations.value['header.regulatory_documents'],
    links: [
      [
        { label: translations.value['header.everything'], to: localePath("/meyoriy-hujjatlar/barchasi") },
        ...data.value?.document_categories.map((item) => ({
          label: item.title,
          to: localePath(`/meyoriy-hujjatlar/${item.slug}`),
        })),
      ],
    ],
  },
  {
    label: translations.value['header.activity'],
    links: [
      [
        ...data.value?.activity_categories.map((item) => ({
          label: item.title,
          to: localePath(`/faoliyat/${item.slug}`),
        })),
        { label: translations.value['header.reports'], to: localePath("/faoliyat/hisobotlar") },
        { label: translations.value['header.vacancies'], to: localePath("/faoliyat/bosh-ish-orinlari") },
        {
          label: translations.value['header.investment_potential'],
          to: localePath("/faoliyat/investitsiya-salohiyati"),
        },
      ],
    ],
  },
  {
    label: translations.value['header.education'],
    links: [
      [
        ...data.value?.education_categories.map((item) => ({
          label: item.title,
          to: localePath(`/talim-va-tarbiya/${item.slug}`),
        })),
        {
          label: translations.value['header.e_library'],
          to: localePath("/talim-va-tarbiya/elektron-kutubxona"),
        },
      ],
    ],
  },
  {
    label: translations.value['header.press_service'],
    links: [
      [
        { label: translations.value['header.everything'], to: localePath("/matbuot-xizmati/barchasi") },
        ...data.value?.news_categories.map((item) => ({
          label: item.title,
          to: localePath(`/matbuot-xizmati/${item.slug}`),
        })),
      ],
    ],
  },
  {
    label: translations.value['header.open_data'],
    links: [
      [
        { label: translations.value['header.everything'], to: localePath("/ochiq-malumotlar/barchasi") },
        ...data.value?.open_source_categories.map((item) => ({
          label: item.title,
          to: localePath(`/ochiq-malumotlar/${item.slug}`),
        })),
        {
          label: translations.value['header.online_streaming'],
          to: localePath("/ochiq-malumotlar/onlayn-translyatsiya"),
        },
      ],
    ],
  },
  {
    label: translations.value['header.services'],
    links: [
      [
        ...interactive_services.value?.results.map((item) => ({
          label: item.title,
          to: localePath(item.url),
        })),
        { label: translations.value['header.appeals'], to: localePath("/xizmatlar/murojaatlar") },
        {
          label: translations.value['header.faq'],
          to: localePath("/xizmatlar/kop-beriladigan-savollar"),
        },
        { label: translations.value['header.my_opinion'], to: localePath("/xizmatlar/mening-fikrim") },
        { label: translations.value['header.map'], to: localePath("/xizmatlar/mttlar-xaritasi") },
      ],
    ],
  },
]);
</script>

<style lang="scss" scoped>
.card {
  @apply flex flex-col gap-y-4 md:gap-y-6 pb-8 border-b border-white-222;
}

.title {
  @apply text-green-dark text-[1.25rem] font-medium mb-6;
}

.link {
  @apply text-black duration-200 hover:text-green ml-1;
}
</style>
