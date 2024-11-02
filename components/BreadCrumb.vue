<template>
  <UBreadcrumb
    divider=">"
    :links="breadcrumbs"
  />
</template>

<script setup>
import { useTranslation } from '~/stores/translations';

const { translations } = storeToRefs(useTranslation());
const localePath = useLocalePath();
const route = useRoute();
const { data } = await useAsyncData('header', () => useHeader().getHeader('/header'));

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

const breadcrumbs = computed(() => {
  const pathSegments = route.path.split("/").filter(Boolean);

  let links = pathSegments.map((segment, index) => {
    const label = segment
      .replace(/-/g, " ")
      .replace(/^\w/, (c) => c.toUpperCase());
    const to = "/" + pathSegments.slice(0, index + 1).join("/");

    return { label, to };
  });
  links.unshift({ label: translations.value['breadCrumb.home'], to: localePath("/") });
  links = links.filter((link) => link.label !== 'Ru' && link.label !== 'En');

  links.forEach(link => {
    navLinks.value.forEach(navLink => {
      navLink.links[0].forEach(item => {
        if(link.to === item.to) {
          link.label = item.label;
        } else if (link.to.includes('/sayt-xaritasi')) {
          link.label = translations.value['footer.site_map'];
        } else if (link.to.includes('/boglanish')) {
          link.label = translations.value['footer.contact'];
        } else if (link.to.includes('/qidirish')) {
          link.label = translations.value['header.search'];
        }
      });
    });
  })
  if(links.length > 2) {
    links.splice(1, 1);
  }
  return links;
});
</script>

<style scoped lang="scss">
.breadcrumb {
  &-list {
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    padding: 0;
  }

  &-list__item {
    display: flex;
    align-items: center;

    .anchor,
    .non-clickable {
      color: #9a999b;
      font-family: "Golos Text", sans-serif;
      text-decoration: none;
      margin: 0px 16px;
      transition: all 0.3s ease;

      &:hover {
        color: #11be86;
      }

      @media (max-width: 500px) {
        margin: 0px 8px;
        font-size: 12px;
      }
    }

    .non-clickable {
      color: #9a999b;
    }

    a.first-link {
      margin-left: 0px;
      margin-right: 16px;

      @media (max-width: 500px) {
        margin-right: 8px;
      }
    }

    span {
      font-family: "Golos Text", sans-serif;
      color: #1d2825;
      margin: 0px 16px;

      @media (max-width: 500px) {
        font-size: 12px;
        margin: 0px 8px;
      }
    }

    @media (max-width: 500px) {
      span,
      a {
        font-size: 12px;
      }
    }
  }
}
</style>
