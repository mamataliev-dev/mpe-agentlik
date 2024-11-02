<template>
  <div>
    <div class="bg-white rounded-br-16 p-4 lg:px-10 lg:pb-8 lg:pt-14">
      <h1 class="text-xl md:text-2xl font-semibold">{{ data.title }}</h1>
      <div class="rounded-lg overflow-hidden mt-10 h-[556px]">
        <img class="w-full h-full object-cover" :src="data.image" :alt="data.title">
      </div>
      <div class="mt-10 inner" v-html="data.text">
      </div>
      <div>
        <div class="flex items-start lg:items-center justify-between lg:gap-x-[48px] lg:justify-normal mt-[1rem]">
          <div class="flex flex-col lg:flex-row lg:items-center items-start gap-x-[8px] gap-y-[8px]">
            <span class="text-[12px] lg:text-[1rem]">{{ translations['postPage.share_socials'] }}:</span>

            <div class="flex gap-x-[8px]">
              <a href="https://web.telegram.org/k/">
                <img class="w-10 h-10 lg:w-[52px] lg:h-[52px]" src="@/assets/img/icons/telegram-post.svg" alt="" />
              </a>

              <a href="https://www.facebook.com/">
                <img class="w-10 h-10 lg:w-[52px] lg:h-[52px]" src="@/assets/img/icons/facebook-post.svg" alt="" />
              </a>
            </div>
          </div>

          <div class="flex items-center -mt-[7px] lg:mt-0 gap-x-[8px]">
            <span class="text-[12px] lg:text-[1rem]">{{ translations['vacancy.print'] }}</span>

            <UButton class="shadow-none bg-transparent hover:bg-transparent" @click="printOut = true"><svg width="24"
                height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd"
                  d="M7 5.75C6.30964 5.75 5.75 6.30964 5.75 7V8C5.75 8.41421 5.41421 8.75 5 8.75C4.58579 8.75 4.25 8.41421 4.25 8V7C4.25 5.48122 5.48122 4.25 7 4.25L17 4.25C18.5188 4.25 19.75 5.48122 19.75 7V8C19.75 8.41421 19.4142 8.75 19 8.75C18.5858 8.75 18.25 8.41421 18.25 8V7C18.25 6.30964 17.6904 5.75 17 5.75L7 5.75ZM17 18.25C17.6904 18.25 18.25 17.6904 18.25 17V16C18.25 15.5858 18.5858 15.25 19 15.25C19.4142 15.25 19.75 15.5858 19.75 16V17C19.75 18.5188 18.5188 19.75 17 19.75L7 19.75C5.48122 19.75 4.25 18.5188 4.25 17V16C4.25 15.5858 4.58579 15.25 5 15.25C5.41421 15.25 5.75 15.5858 5.75 16V17C5.75 17.6904 6.30964 18.25 7 18.25L17 18.25ZM2 11.25C1.58579 11.25 1.25 11.5858 1.25 12C1.25 12.4142 1.58579 12.75 2 12.75L22 12.75C22.4142 12.75 22.75 12.4142 22.75 12C22.75 11.5858 22.4142 11.25 22 11.25H2Z"
                  fill="#1D2825" />
              </svg>
            </UButton>
          </div>
        </div>
      </div>
    </div>

    <div v-if="data?.others?.filter(item => item.category.slug === route.params.slug)?.length > 0" class="flex flex-col gap-y-4 lg:gap-y-8 mt-10 lg:mt-20">
      <h3 class="page-subtitle">{{ translations['postPage.related_post'] }}:</h3>

      <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        <TheCard v-for="item in data.others.filter(item => item.category.slug === route.params.slug)" :link="localePath(`/matbuot-xizmati/${route.params.slug}/${item.slug}`)" :image="item.image" :title="item.title" :date="item.created_at"
          :views="item.views" :key="item.id" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { usePage } from "~/stores/page";
import { useNews } from "~/stores/news";
import { useTranslation } from '~/stores/translations';

const { translations } = storeToRefs(useTranslation());
const route = useRoute();
const { data } = await useAsyncData('newsSlugId', () => useNews().getNews(`/news/${route.params.id}`));

const page = usePage();


useHead({
  title: `MPE.UZ | ${data?.value?.title}`,
})

const emits = defineEmits(["isPostPage"]);

onMounted(() => {
  emits("isPostPage", true);
  page.definePageTitle(data?.value?.title);
  page.definePageDate(data?.value?.created_at);
});
</script>

<style lang="scss" scoped>
.inner {
  * {
    width: 100%;
  }

  img {
    border-radius: 8px;
  }
}
</style>
