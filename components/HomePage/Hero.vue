<template>
  <header
    class="before:bg-[url('~/assets/img/png/bg-ornament.png')] py-10 pb-[62px] before:-z-10 before:pointer-events-none before:w-full before:h-full relative before:opacity-5 before:absolute before:top-0 before:left-0 before:bg-repeat">
    <div class="wrapper">
      <Swiper class="rounded-2xl overflow-hidden"
        :modules="[SwiperAutoplay, SwiperEffectCreative, SwiperNavigation, SwiperPagination]" :slides-per-view="1"
        :loop="true" :speed="1000" :effect="'creative'" :pagination="{ clickable: true, type: 'bullets' }" :autoplay="{
          delay: 2000,
          // disableOnInteraction: true,
        }" :creative-effect="{
          prev: {
            shadow: false,
            translate: ['-20%', 0, -1],
          },
          next: {
            translate: ['100%', 0, 0],
          },
        }">
        <HomePageSwiperNavigation />
        <SwiperSlide v-for="slide in banners" :key="slide.id">
          <div
            class="h-[568px] md:h-[668px] xl:h-[768px] before:absolute before:pointer-events-none before:h-full before:w-full before:z-[2] relative before:bg-gradient-to-t before:from-[rgba(0,0,0,0.7)] before:to-[rgba(0,0,0,0)]">
            <!-- <video class="w-full h-full object-cover -z-[1] absolute top-0 left-0" autoplay loop muted>
            <source src="/assets/videos/hero-home.mp4" type="video/mp4" />
          </video> -->
            <img :src="slide.image" class="w-full h-full object-cover -z-[1] absolute top-0 left-0">
            </img>
            <div class="absolute z-[5] left-5 right-5 md:left-10 md:right-10 bottom-10 flex">
              <div class="flex items-start gap-6">
                <img class="hidden sm:block" src="~/assets/img/icons/logo_without_text_colorless.svg" alt="logo" />
                <ULink target="_blank" :to="slide.url"
                  class="line-clamp-3 text-lg sm:text-xl md:text-2xl md:max-w-[60%] text-white hover:text-green duration-200 font-ttfirs">
                  {{ slide.title }}
                </ULink>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
      <div class="flex items-center justify-between mt-20">
        <h3 class="text-xl sm:text-2xl md:text-[2rem] font-medium">{{ translations['main.news'] }}</h3>
        <ULink :to="localePath('/matbuot-xizmati/barchasi')"
          class="text-green flex items-center gap-2 text-xs sm:text-base md:text-lg">
          {{ translations['main.see_all'] }}
          <i class="i-heroicons-chevron-double-right"></i>
        </ULink>
      </div>
      <div class="md:grid hidden md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-10">
        <TheCard :link="`/matbuot-xizmati/${post.category.slug}/${post.slug}`" :title="post.title" :image="post.image"
          :date="post.created_at" :views="post.views" v-for="post in news" :key="post.id" />
      </div>
      <Swiper class="md:!hidden mt-10" :modules="[SwiperAutoplay]" :slides-per-view="1.2" :loop="true"
        :space-between="16" :speed="1000" :autoplay="{
          delay: 2000,
          disableOnInteraction: true,
        }">
        <SwiperSlide class="!h-auto" v-for="post in news" :key="post.id">
          <TheCard :link="`/matbuot-xizmati/${post.category.slug}/${post.slug}`" :title="post.title" :image="post.image"
            :date="post.created_at" :views="post.views" />
        </SwiperSlide>
      </Swiper>
    </div>
  </header>
</template>
<script setup>
import { useTranslation } from '~/stores/translations';

const { translations } = storeToRefs(useTranslation());
const localePath = useLocalePath();
const props = defineProps({
  banners: Array,
  news: Array,
});

</script>

<style lang="scss">
.swiper-pagination-bullet {
  background-color: #fff;
  width: 20px;
  height: 4px;
  border-radius: 100px;
  transition: width 0.3s;

  &-active {
    width: 40px;
  }
}

@media (min-width: 768px) {
  .swiper-pagination {
    display: none;
  }
}
</style>
