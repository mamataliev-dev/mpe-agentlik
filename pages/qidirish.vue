<template>
  <div>
    <div v-show="isFound" class="wrapper mt-16 mb-[120px]">
      <div>
        <BreadCrumb />
        <h1 class="title">{{ translations['search.results'] }}</h1>
      </div>

      <div class="bg-white rounded-xl mt-10 p-4 md:p-8">
        <h2 class="text-base md:text-lg lg:text-xl xl:text-2xl mb-6">{{ translations['search.found'] }}</h2>

        <div v-for="(result, key) in data" :key="key" class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <ULink v-for="item in result" :key="item.id"
            :to="localePath(`${searchCategories.find((category) => category.key === key)?.slug}${item?.category?.slug ? '/' + item?.category?.slug : ''}/${item.slug}`)"
            class="flex flex-col gap-y-2 md:gap-y-4 border border-white-222 hover:border-green rounded-xl p-2 sm:p-4 duration-200">
            <div class="flex gap-x-[12px] text-xs sm:text-sm md:text-base">
              <span class="text-grey">{{ searchCategories.find((category) => category.key === key)?.parent ||
                searchCategories.find((category) => category.key === key)?.title }}</span>
              <span class="text-grey">|</span>
              <span class="text-grey">{{ item?.category?.title || searchCategories.find((category) => category.key ===
                key)?.title }}</span>
            </div>

            <p class="text-start font-semibold text-sm sm:text-base md:text-[18px]">
              {{ item.title }}
            </p>
          </ULink>
        </div>
      </div>
    </div>

    <div v-show="!isFound" class="h-[calc(100vh-100px)] flex flex-col items-center justify-center">
      <img src="~/assets/img/icons/search-not-found.svg" alt="Search history not found">

      <div class="flex flex-col items-center mt-[13px] gap-y-[8px] px-4 sm:px-0">
        <span class="text-center">{{ translations['search.unfortunately'] }}
          <span class="text-green">“{{ route.query.search }}”</span>
          {{ translations['search.not_found'] }}</span>
        <span class="text-center">{{ translations['search.try_another'] }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useSearch } from "~/stores/search";
import { useTranslation } from '~/stores/translations';

const { translations } = storeToRefs(useTranslation());

const route = useRoute();
const isFound = ref(true);
const enlargedHistory = ref(null);
const localePath = useLocalePath();

const searchCategories = computed(() => [
  {
    parent: translations.value['header.agency'],
    title: translations.value['header.leadership'],
    slug: '/agentlik/rahbariyat',
    key: "leaderships"
  },
  {
    parent: translations.value['header.agency'],
    title: translations.value['header.central_apparatus'],
    slug: '/agentlik/markaziy-apparat',
    key: "central_apparatus"
  },
  {
    parent: translations.value['header.agency'],
    title: translations.value['header.regional_administrations'],
    slug: '/agentlik/hududiy-boshqarmalar',
    key: "regional_administrations"
  },
  {
    parent: translations.value['header.agency'],
    title: translations.value['header.community_council'],
    slug: '/agentlik/jamoatchilik-kengashi',
    key: "community_council",
  },
  {
    title: translations.value['header.press_service'],
    slug: '/matbuot-xizmati',
    key: "news"
  },
  {
    title: translations.value['header.activity'],
    slug: '/faoliyat',
    key: "activities"
  },
  {
    title: translations.value['header.education'],
    slug: '/talim-va-tarbiya',
    key: "educations"
  },
]);

const { data } = await useAsyncData('search', () => getData());
if(process.client) {
  isFound.value = Object.keys(data.value).length !== 0;
  saveDataToLocalStorage(data.value);
}

watch(() => route.query, () => {
  useHead({
    title: route.query.search ? `MPE.UZ | ${route.query.search}` : `MPE.UZ | ${translations.value['search.results']}`,
  });
}, { immediate: true });

watch(() => route.query, async () => {
  data.value = await getData();
  if (process.client) {
    isFound.value = Object.keys(data.value).length !== 0;
    saveDataToLocalStorage(data.value)
  }
});


// Function to transform each item
function transformItem (item, key) {
  return {
    id: item.id,
    title: item.title,
    slug: item?.category ? `${searchCategories.value.find(el => el.key === key)?.slug}/${item.category.slug}/${item.slug}` : `${searchCategories.value.find(el => el.key === key)?.slug}/${item.slug}`,
    views: item.views,
    image: item.image,
    date: item.created_at
  };
};

function saveDataToLocalStorage (data) {
  let keysToTransform = ['community_council', 'news', 'activities', 'educations'];
  keysToTransform.forEach(key => {
    if (data[key] && Array.isArray(data[key])) {
      enlargedHistory.value = data[key].map(item => transformItem(item, key)).slice(0, 2);
    }
  });
  if (enlargedHistory.value?.length > 0) {
    localStorage.setItem('searchEnlargedHistory', JSON.stringify([...enlargedHistory.value]));
    useSearch().enlargedSearch = [...enlargedHistory.value];
  }
};

if (process.client) {
  window.scrollTo(0, 0);    
}


async function getData() {
  let data = await useSearch().getSearch('/search', { search: route.query.search });

  data = Object.fromEntries(
    Object.entries(data).filter(([key, value]) => Array.isArray(value) && value.length > 0)
  );
  return data;
}



</script>

<style lang="scss" scoped></style>
