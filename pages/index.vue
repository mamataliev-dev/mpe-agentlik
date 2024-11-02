<template>
  <div>
    <HomePageHero :banners="data.banners.results" :news="data.news.results.slice(0, 4)" />
    <main class="bg-white">
      <div class="wrapper py-20 space-y-20">
        <HomePageSectionNavigation :ad="data.ads.results[0]" />
        <section>
          <h3 class="text-xl sm:text-2xl md:text-[2rem] font-medium">{{ translations['main.interactive_services'] }}
          </h3>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
            <figure v-for="(result, idx) in data.interactiveServices.results.slice(0, 3)" :key="result.id"
              class="p-4 sm:p-8 rounded-2xl bg-white-111 flex flex-col">
              <div class="h-[350px] sm:h-[300px] lg:h-[450px] flex items-center justify-center mb-4">
                <img class="rounded-2xl" :src="`/assets/icons/colored_list_${idx + 1}.svg`" :alt="result.title" />
              </div>
              <div class="flex-auto flex flex-col justify-between">
                <figcaption class="font-semibold text-xl lg:text-2xl mb-10 line-clamp-3">
                  {{ result.title }}
                </figcaption>
                <ULink target="_blank" :to="result.url"
                  class="text-green-dark font-medium duration-200 hover:text-green mt-auto flex items-center gap-2 text-base">
                  {{ translations['main.see_all'] }}<i class="i-heroicons-chevron-double-right"></i></ULink>
              </div>
            </figure>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            <ULink target="_blank" v-for="result in data.interactiveServices.results.slice(3)" :key="result.id"
              :to="result.url"
              class="overflow-hidden before:ease-in-out after:ease-in-out bg-white group cursor-pointer relative flex flex-col gap-8 justify-between rounded-2xl border hover:after:w-full border-white-222 hover:border-green duration-300 p-4 md:p-6 px-8 before:h-full before:w-2 hover:before:w-full after:absolute after:top-0 after:left-0 after:h-full after:w-0 after:duration-300 after:opacity-5 after:bg-[url('~/assets/img/png/bg-ornament.png')] before:duration-300 before:-z-1 before:bg-green before:absolute before:top-0 before:left-0">
              <h4
                class="font-medium text-lg xl:text-xl xl:max-w-[80%] duration-300 group-hover:text-white group-hover:z-[5]">
                {{ result.title }}
              </h4>
              <p
                class="text-green-dark group-hover:z-[5] font-medium duration-300 group-hover:text-white mt-auto flex items-center gap-2 text-sm xl:text-base">
                {{ translations['main.see_all'] }}<i class="i-heroicons-chevron-double-right"></i></p>
            </ULink>
          </div>
        </section>
        <HomePageSectionNavigation :ad="data.ads.results[1]" />
        <section>
          <h3 class="text-xl sm:text-xl md:text-2xl leading-8 md:leading-10 md:text-[2rem] font-medium">
            {{ translations['main.statistics_title'] }}
          </h3>
          <div class="grid grid-cols-10 items-start gap-4 mt-10">
            <div class="col-span-10 xl:col-span-6 border border-white-222 rounded-2xl">
              <div class="p-4 border-b flex gap-4 overflow-x-auto border-white-222">
                <UButton @click="statisticsToggle(idx)" v-for="(statistic, idx) in statistics" :key="idx" size="xl"
                  :ui="{ padding: { xl: 'py-3 px-4' }, rounded: 'rounded-xl' }" :class="{
                    'ring-1 ring-green text-green bg-[#EEFFFA]':
                      statistic.active,
                    'ring-white-222 text-green-dark': !statistic.active,
                  }" :variant="statistic.active ? 'soft' : 'outline'" :label="statistic.title" />
              </div>
              <div v-show="statistics[0].active" class="p-4 sm:p-8 pl-0">
                <div class="block md:flex">
                  <div class="w-full md:w-[300px]">
                    <ClientOnly>
                      <apexchart type="donut" :options="pieChartOptions" :series="pieSeries">
                      </apexchart>
                    </ClientOnly>
                  </div>
                  <div class="md:border-l mt-4 md:mt-0 md:border-white-222 pl-4 md:pl-8 flex-auto">
                    <h4 class="font-medium text-xl">
                      {{ statistics[0].title }}
                    </h4>
                    <div class="mt-6 grid grid-cols-2 gap-4">
                      <div v-for="(label, idx) in pieChartOptions.labels" :key="idx"
                        class="relative border border-white-222 bg-white-111 p-4 rounded-lg">
                        <div :style="{ backgroundColor: colorsOfChart[idx] }"
                          class="h-3 w-3 rounded-full absolute top-4 right-4"></div>
                        <h4 class="font-medium text-lg md:text-2xl">
                          {{ pieSeries[idx] }}<span class="ml-2 text-xs sm:text-sm text-grey">{{ ((pieSeries[idx] *
                            100) / pieSeries.reduce((a, b) => a + b)).toFixed(2) }}%</span>
                        </h4>
                        <p class="font-medium text-sm md:text-lg text-grey-0 mt-4 truncate">
                          {{ label }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div v-show="statistics[1].active" class="p-4 sm:p-8">
                <h4 class="font-medium text-xl">{{ statistics[1].title }}</h4>
                <div class="block lg:flex mt-6">
                  <div class="w-full lg:w-[268px] pb-4 lg:pb-0  lg:pr-4 space-y-6">
                    <div v-for="(series, idx) in columnSeries" :key="idx" class="flex w-full gap-2 items-start">
                      <div :style="{ backgroundColor: colorsOfChart[idx] }" class="w-3 h-3 shrink-0 mt-1 rounded-full">
                      </div>
                      <p class="text-grey-0 font-medium text-base">
                        {{ series.name }}
                      </p>
                    </div>
                  </div>
                  <div
                    class="lg:pl-6 overflow-x-auto sm:overflow-visible border-t lg:border-t-0 lg:border-l lg:border-22 flex-auto">
                    <ClientOnly>
                      <apexchart type="bar" :options="columnChartOptions" :series="columnSeries">
                      </apexchart>
                    </ClientOnly>
                  </div>
                </div>
              </div>
              <div v-show="statistics[2].active" class="p-4 sm:p-8">
                <div class="flex flex-col sm:items-center sm:flex-row gap-4 sm:gap-0 sm:justify-between">
                  <h4 class="font-medium text-xl">{{ statistics[2].title }}</h4>
                </div>
                <div class="mt-6 border rounded-xl border-white-222 overflow-x-auto overflow-y-hidden">
                  <ClientOnly>
                    <apexchart width="100%" height="350" type="area" :options="areaChartOptions" :series="areaSeries">
                    </apexchart>
                  </ClientOnly>
                </div>
              </div>
            </div>
            <div class="col-span-10 xl:col-span-4 border border-white-222 rounded-2xl">
              <div class="px-4 sm:px-8 py-3 sm:py-6 border-b border-white-222">
                <h4 class="font-medium text-2xl">{{ translations['main.questioner'] }}</h4>
              </div>
              <div class="p-4 sm:p-8">
                <h5 class="text-lg sm:text-xl font-medium">
                  {{ data.questionsData.results[currentQuestion - 1].question }}
                </h5>
                <URadioGroup :ui="{
                  fieldset: 'grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6',
                  wrapper: 'mt-8',
                }" :uiRadio="{
                  label: 'text-base text-green-dark cursor-pointer',
                  wrapper: 'items-center',
                  base: 'cursor-pointer',
                  border: 'border-[#D4D4DD]',
                }" v-model="selectedList[currentQuestion - 1]" :options="sideOptions">
                </URadioGroup>
                <div class="mt-12 flex items-center justify-between">
                  <p class="hidden sm:block text-lg text-green-gray">
                    <span class="text-green">{{ currentQuestion }}</span> / {{ data.questionsData.count }}
                  </p>
                  <div class="flex gap-3 w-full sm:w-auto">
                    <UButton :disabled="!selectedList[currentQuestion - 1] || disabledAfterAll" :loading="loading"
                      @click="submitQuestionAnswer" size="xl" :ui="{
                        padding: { xl: 'py-3 px-4 sm:py-4 sm:px-6' },
                        rounded: 'rounded-lg',
                      }" class="duration-200 bg-green flex-1 sm:flex-auto" variant="solid"
                      :label="translations['main.next']" trailing-icon="i-heroicons-arrow-right" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <HomePageSectionNavigation :ad="data.ads.results[2]" />
        <section>
          <div class="grid grid-cols-10 items-start xl:items-stretch gap-4">
            <div class="col-span-10 lg:col-span-5 xl:col-span-7 border border-white-222 rounded-2xl">
              <div class="p-4 sm:p-8 border-b border-white-222">
                <h4 class="font-medium text-xl">
                  {{ translations['main.statistics_title_second'] }}
                </h4>
                <div class="mt-6 grid grid-cols-2 xl:grid-cols-4 gap-4">
                  <div class="relative border border-white-222 bg-white-111 p-4 rounded-lg">
                    <div :style="{ backgroundColor: colorsOfChart[0] }"
                      class="h-3 w-3 rounded-full absolute top-4 right-4"></div>
                    <p class="font-medium text-sm md:text-lg text-grey-0 truncate">{{ translations['main.perfect'] }}
                    </p>
                    <h4 class="font-medium text-lg md:text-2xl mt-4 flex items-start">
                      {{ formRating.selectedService ? serviceStatistics?.great_count || 0 : allStatistics.great_count }}
                      <span class="ml-2 mt-1 text-xs sm:text-sm text-grey">{{
                        percentStatistics(formRating.selectedService ? serviceStatistics?.great_count || 0 : allStatistics.great_count) }}%</span>
                    </h4>
                  </div>
                  <div class="relative border border-white-222 bg-white-111 p-4 rounded-lg">
                    <div :style="{ backgroundColor: colorsOfChart[1] }"
                      class="h-3 w-3 rounded-full absolute top-4 right-4"></div>
                    <p class="font-medium text-sm md:text-lg text-grey-0 truncate">{{ translations['main.good'] }}</p>
                    <h4 class="font-medium text-lg md:text-2xl mt-4 flex items-start">
                      {{ formRating.selectedService ? serviceStatistics?.good_count || 0 : allStatistics.good_count
                      }}<span class="ml-2 mt-1 text-xs sm:text-sm text-grey">{{ percentStatistics(formRating.selectedService ? serviceStatistics?.good_count || 0 : allStatistics.good_count) }}%</span>
                    </h4>
                  </div>
                  <div class="relative border border-white-222 bg-white-111 p-4 rounded-lg">
                    <div :style="{ backgroundColor: colorsOfChart[2] }"
                      class="h-3 w-3 rounded-full absolute top-4 right-4"></div>
                    <p class="font-medium text-sm md:text-lg text-grey-0 truncate">{{ translations['main.not_bad'] }}
                    </p>
                    <h4 class="font-medium text-lg md:text-2xl mt-4 flex items-start">
                      {{ formRating.selectedService ? serviceStatistics?.normal_count || 0 : allStatistics.normal_count
                      }}<span class="ml-2 mt-1 text-xs sm:text-sm text-grey">{{ percentStatistics(formRating.selectedService ? serviceStatistics?.normal_count || 0 : allStatistics.normal_count) }}%</span>
                    </h4>
                  </div>
                  <div class="relative border border-white-222 bg-white-111 p-4 rounded-lg">
                    <div :style="{ backgroundColor: colorsOfChart[3] }"
                      class="h-3 w-3 rounded-full absolute top-4 right-4"></div>
                    <p class="font-medium text-sm md:text-lg text-grey-0 truncate">{{ translations['main.bad'] }}</p>
                    <h4 class="font-medium text-lg md:text-2xl mt-4 flex items-start">
                      {{ formRating.selectedService ? serviceStatistics?.bad_count || 0 : allStatistics.bad_count
                      }}<span class="ml-2 mt-1 text-xs sm:text-sm text-grey">{{ percentStatistics(formRating.selectedService ? serviceStatistics?.bad_count || 0 : allStatistics.bad_count) }}%</span>
                    </h4>
                  </div>
                </div>
              </div>
              <div class="p-4 sm:p-8 grid gap-4 xl:gap-0 grid-cols-1 xl:grid-cols-2">
                <div class="space-y-8">
                  <h3 class="font-semibold text-xl sm:text-2xl">
                    {{ translations['main.rate_service_title'] }}
                  </h3>
                  <div>
                    <UForm :state="formRating" @submit="submitServiceAnswer" class="space-y-6">
                      <UFormGroup :label="translations['main.type_of_service']" name="selectedService" size="xl" :ui="{
                        label: { base: 'text-green-dark' },
                        size: { xl: 'text-lg' },
                      }">
                        <USelectMenu size="xl" :placeholder="translations['header.services']" :ui="{
                          padding: { xl: 'py-4 px-6' },
                          placeholder: 'text-grey',
                          rounded: 'rounded-xl',
                          color: {
                            white: { outline: 'shadow-none ring-white-222' },
                          },
                        }" :uiMenu="{
                          option: { padding: 'px-4 py-4', size: 'text-md' },
                        }" v-model="formRating.selectedService" :options="services">
                        </USelectMenu>
                      </UFormGroup>

                      <UFormGroup name="ratingService">
                        <URadioGroup :ui="{ fieldset: 'grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6' }" :uiRadio="{
                          label: 'text-base text-green-dark cursor-pointer',
                          wrapper: 'items-center',
                          base: 'cursor-pointer',
                          border: 'border-[#D4D4DD]',
                        }" v-model="formRating.ratingService" :options="ratingOptions">
                        </URadioGroup>
                      </UFormGroup>

                      <UButton :loading="loading" :disabled="!formRating.selectedService || !formRating.ratingService"
                        type="submit" class="w-full justify-center sm:justify-normal sm:w-auto" :ui="{
                          padding: { xl: 'px-6 py-4' },
                          rounded: 'rounded-xl',
                        }" size="xl" variant="solid" :label="translations['main.rate']" />
                    </UForm>
                  </div>
                </div>
                <div>
                  <ClientOnly>
                    <apexchart type="donut" :options="pieChartOptions2" :series="pieSeries2">
                    </apexchart>
                  </ClientOnly>
                </div>
              </div>
            </div>
            <div
              class="col-span-10 lg:col-span-5 xl:col-span-3 flex flex-col border border-white-222 rounded-2xl overflow-hidden">
              <div
                class="flex-auto min-h-[450px] xl:min-h-[235px] border-white-222 bg-[url(~/assets/img/png/side-image.png)] bg-cover bg-center relative before:w-full before:h-full before:absolute before:top-0 before:left-0 before:bg-gradient-to-t before:from-[rgba(0,0,0,0.7)] before:to-[rgba(0,0,0,0)]">
                <p class="absolute bottom-10 left-6 right-6 z-1 font-medium text-2xl mt-auto text-white">
                  {{ translations['main.year_title'] }}
                </p>
              </div>
              <div class="p-4 sm:p-8 space-y-4">
                <UButton :to="staticData?.telegram" target="_blank" size="xl" :ui="{
                  padding: { xl: 'py-4 px-6' },
                  rounded: 'rounded-lg',
                  icon: { base: 'last:ml-auto' },
                }" class="duration-200 w-full bg-green-100 hover:bg-green-50" variant="soft" :truncate="true"
                  :label="translations['main.telegram']" icon="i-heroicons-paper-airplane"
                  trailing-icon="i-heroicons-arrow-right" />
                <UButton to="https://t.me" target="_blank" size="xl" :ui="{
                  padding: { xl: 'py-4 px-6' },
                  rounded: 'rounded-lg',
                  icon: { base: 'last:ml-auto' },
                }" class="duration-200 w-full bg-green-100 hover:bg-green-50" variant="soft"
                  :label="translations['main.questioner']" icon="i-heroicons-question-mark-circle"
                  trailing-icon="i-heroicons-arrow-right" />
                <UButton to="https://t.me" target="_blank" size="xl" :ui="{
                  padding: { xl: 'py-4 px-6' },
                  rounded: 'rounded-lg',
                  icon: { base: 'last:ml-auto' },
                }" class="duration-200 w-full bg-green-100 hover:bg-green-50" variant="soft"
                  :label="translations['main.application']" icon="i-heroicons-envelope"
                  trailing-icon="i-heroicons-arrow-right" />
              </div>
            </div>
          </div>
        </section>
        <HomePageSectionNavigation :ad="data.ads.results[3]" class="hidden sm:flex" />
        <section class="hidden sm:block">
          <h3 class="text-2xl leading-10 md:text-[2rem] font-medium">{{ translations['header.useful_links'] }}</h3>
          <div class="mt-10">
            <Swiper class="rounded-2xl overflow-hidden" :modules="[SwiperAutoplay]"
              :breakpoints="{ 540: { slidesPerView: 1.2 }, 640: { slidesPerView: 1.8 }, 768: { slidesPerView: 2 }, 1024: { slidesPerView: 2.6 }, 1280: { slidesPerView: 3.2 } }"
              :slides-per-view="1" :loop="true" :loopAddBlankSlides="true" :speed="2000" :spaceBetween="16" :autoplay="{
                delay: 2000,
                disableOnInteraction: false,
              }">
              <SwiperSlide class="!h-auto" v-for="link in data.links.results" :key="link.id">
                <ULink :to="link.url" target="_blank"
                  class="border h-full flex flex-col gap-6 justify-between border-white-222 bg-white rounded-2xl p-4 lg:p-8">
                  <div class="flex gap-4 items-center">
                    <img class="h-12 w-12 shrink-0" :src="link.image" :alt="link.title" />
                    <p class="line-clamp-2 text-base lg:text-xl">
                      {{ link.title }}
                    </p>
                  </div>
                  <p
                    class="text-blue font-medium duration-200 flex items-center gap-2 text-sm lg:text-base line-clamp-1">
                    <i class="i-heroicons-link shrink-0 text-lg lg:text-xl"></i>{{ link.url }}
                  </p>
                </ULink>
              </SwiperSlide>
            </Swiper>
          </div>
        </section>
      </div>
    </main>
  </div>
</template>

<script setup>
import { useServices } from "~/stores/services";
import { useStatistic } from "~/stores/statistic";
import { useBanners } from "~/stores/banners";
import { useNews } from "~/stores/news";
import { useStatic } from '~/stores/static';
import { useTranslation } from '~/stores/translations';
import { useAdvertisment } from "~/stores/advertisment";

const { translations } = storeToRefs(useTranslation());
const { staticData } = useStatic();
const localePath = useLocalePath();

const { data } = await useAsyncData('homeApis', async () => {
  let questionsData = await useServices().getServices('/questions');
  let interactiveServices = await useServices().getServices('/interactive_services');
  let banners = await useBanners().getBanners('/banners');
  let news = await useNews().getNews('/news');
  let services = await useServices().getServices('/services');
  let links = await useServices().getServices('/useful_links');
  let allStatistics = await useStatistic().getAllStatistics('/second_survey/statistic');
  let ads = await useAdvertisment().getAd('/adverts');

  return {
    questionsData,
    interactiveServices,
    banners,
    news,
    services,
    links,
    allStatistics,
    ads
  }
});

const { serviceStatistics, allStatistics } = storeToRefs(useStatistic());


useHead({
  title: "MPE.UZ",
});

const currentQuestion = ref(1);
const selectedList = reactive([]);
const loading = ref(false);
const disabledAfterAll = ref(false);

const formRating = reactive({
  selectedService: "",
  ratingService: "",
});

watch(() => formRating.selectedService, (service) => {
  if (service) {
    useStatistic().getStatistics(`/second_survey/statistic`, { service_id: service.value });
  }
})

const services = ref([
  ...data.value.services.results.map((service) => ({
    value: service.id,
    label: service.title,
  }))
]);


const ratingOptions = [
  { value: 1, label: translations.value['main.perfect'] },
  { value: 3, label: translations.value['main.not_bad'] },
  { value: 2, label: translations.value['main.good'] },
  { value: 4, label: translations.value['main.bad'] },
];

const sideOptions = computed(() => {
  return data.value?.questionsData.results[currentQuestion.value - 1].answers.map((answer) => ({
    value: answer.id,
    label: answer.answer,
  }));
});

const colorsOfChart = [
  "#898F35",
  "#EBA63E",
  "#23948E",
  "#B1B837",
  "#48B1AC"
];

const statistics = ref([
  { title: translations.value['main.statistics_one'], active: true },
  { title: translations.value['main.statistics_two'], active: false },
  { title: translations.value['main.statistics_three'], active: false },
]);

watch(() => translations.value, () => {
  statistics.value = [
    { title: translations.value['main.statistics_one'], active: statistics.value[0].active },
    { title: translations.value['main.statistics_two'], active: statistics.value[1].active },
    { title: translations.value['main.statistics_three'], active: statistics.value[2].active },
  ];
});

const columnChartOptions = computed(() => {
  return {
    chart: {
      type: "bar",
      stacked: true,
      stackType: "100%",
      height: "100%",
      width: "100%",
      toolbar: {
        show: false,
      },
      fontFamily: "Golos Text",
    },
    plotOptions: {
      bar: {
        borderRadius: 8,
        borderRadiusApplication: "around",
        borderRadiusWhenStacked: "all",
        dataLabels: {
          total: {
            enabled: true,
            formatter: (val, opt) => {
              return opt.w.config.series.reduce((a, b) => a + b.data[opt.dataPointIndex].p, 0);
            },
            offsetY: -10,
            style: {
              fontSize: "20px",
              fontWeight: "600",
              fontFamily: "Golos Text",
            },
          }
        }
      },
    },
    colors: colorsOfChart,
    stroke: {
      width: 4,
      colors: ["#fff"],
    },
    // legend: {
    //   show: false,
    // },
    tooltip: {
      enabledOnSeries: [0, 1, 2, 3],
      y: {
        formatter: function (val, opt) {
          return opt.w.config.series[opt.seriesIndex].data[opt.dataPointIndex].p;
        },
      },
    },
    yaxis: {
      labels: {
        show: false,
      },
    },
    xaxis: {
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    responsive: [
      {
        breakpoint: 640,
        options: {
          chart: {
            width: "500px",
          }
        },
      },
    ],
    grid: {
      yaxis: {
        lines: {
          show: false,
        },
      },
      padding: {
        top: 10,
        right: 0,
        bottom: 10,
        left: 0,
      },
    },
    dataLabels: {
      enabled: true,
      formatter: function (val, opt) {
        return opt.w.config.series[opt.seriesIndex].data[opt.dataPointIndex].p;
      },
      style: {
        fontSize: "12px",
        fontWeight: "400",
        fontFamily: "Golos Text",
      },
    },
  }
});
const columnSeries = computed(() => [
  // {
  //   name: "Maktabgacha ta’lim tashkilotlar soni",
  //   data: [
  //     {
  //       x: "2017",
  //       y: 5211,
  //     },
  //     {
  //       x: "2022",
  //       y: 29420,
  //     },
  //     {
  //       x: "2023",
  //       y: 33942,
  //     },
  //     {
  //       x: "2024",
  //       y: 35541,
  //     },
  //   ],
  // },
  {
    name: translations.value['statistics.davlat'],
    data: [
      {
        x: "2017",
        y: 70,
        p: 4961
      },
      {
        x: "2022",
        y: 25,
        p: 6598
      },
      {
        x: "2023",
        y: 25,
        p: 6780
      },
      {
        x: "2024",
        y: 25,
        p: 6867
      },
    ],
  },
  {
    name: translations.value['statistics.nodavlat'],
    data: [
      {
        x: "2017",
        y: 20,
        p: 250
      },
      {
        x: "2022",
        y: 30,
        p: 22822
      },
      {
        x: "2023",
        y: 30,
        p: 27162
      },
      {
        x: "2024",
        y: 30,
        p: 28674
      },
    ],
  },
  {
    name: translations.value['statistics.dxsh'],
    data: [
      {
        x: "2017",
        y: 0,
        p: 0
      },
      {
        x: "2022",
        y: 15,
        p: 1313
      },
      {
        x: "2023",
        y: 15,
        p: 1388
      },
      {
        x: "2024",
        y: 15,
        p: 1405
      },
    ],
  },
  {
    name: translations.value['statistics.oilaviy'],
    data: [
      {
        x: "2017",
        y: 0,
        p: 0
      },
      {
        x: "2022",
        y: 30,
        p: 20676
      },
      {
        x: "2023",
        y: 30,
        p: 24927
      },
      {
        x: "2024",
        y: 30,
        p: 26422
      },
    ],
  },
]);
const pieChartOptions = computed(() => {
  return {
    chart: {
      type: "donut",
      width: "100%",
      height: "100%",
    },
    plotOptions: {
      pie: {
        customScale: 1,
        expandOnClick: false,
        donut: {
          labels: {
            show: true,
            value: {
              show: true,
              fontWeight: "500",
              fontSize: "20px",
              fontFamily: "Golos Text",
              color: "#1D2825",
              offsetY: 0,
              formatter: function (val) {
                return val;
              },
            },
            total: {
              show: true,
              showAlways: true,
              label: translations.value['main.all_statistics'],
              fontSize: "14px",
              fontFamily: "Golos Text",
              color: "#5D5D5F",
              formatter: function (w) {
                return w.globals.seriesTotals.reduce((a, b) => {
                  return a + b;
                }, 0);
              },
            },
          },
        },
      },
    },
    legend: {
      show: false,
    },
    colors: colorsOfChart,
    tooltip: {
      style: {
        fontSize: "16px",
        fontFamily: "Golos Text",
      },
    },
    responsive: [
      {
        breakpoint: 768,
        options: {
          plotOptions: {
            pie: {
              donut: {
                labels: {
                  value: {
                    fontSize: "24px",
                    offsetY: 10,
                  },
                  total: {
                    fontSize: "20px"
                  }
                }
              }
            }
          }
        },
      },
      {
        breakpoint: 460,
        options: {
          plotOptions: {
            pie: {
              donut: {
                labels: {
                  value: {
                    fontSize: "20px",
                    offsetY: 10,
                  },
                  total: {
                    fontSize: "18px"
                  }
                }
              }
            }
          }
        },
      },
      {
        breakpoint: 390,
        options: {
          plotOptions: {
            pie: {
              donut: {
                labels: {
                  value: {
                    fontSize: "16px",
                    offsetY: 10,
                  },
                  total: {
                    fontSize: "14px"
                  }
                }
              }
            }
          }
        },
      },
      {
        breakpoint: 340,
        options: {
          plotOptions: {
            pie: {
              donut: {
                labels: {
                  value: {
                    fontSize: "12px",
                    offsetY: 4,
                  },
                  total: {
                    fontSize: "10px"
                  }
                }
              }
            }
          }
        },
      },
    ],
    dataLabels: {
      enabled: false,
    },
    labels: [translations.value['statistics.davlat'], translations.value['statistics.nodavlat'], translations.value['statistics.dxsh'], translations.value['statistics.oilaviy']],
  }
});
const pieChartOptions2 = computed(() => {
  return {
    chart: {
      type: "donut",
      width: "100%",
      height: "100%",
    },
    plotOptions: {
      pie: {
        customScale: 1,
        expandOnClick: false,
        donut: {
          size: "55%",
          labels: {
            show: true,
            value: {
              show: true,
              fontWeight: "500",
              fontSize: "24px",
              fontFamily: "Golos Text",
              color: "#1D2825",
              offsetY: 10,
              formatter: function (val) {
                return val;
              },
            },
            total: {
              show: true,
              showAlways: true,
              label: translations.value['main.all_statistics'],
              fontSize: "18px",
              fontFamily: "Golos Text",
              color: "#5D5D5F",
              formatter: function (w) {
                return w.globals.seriesTotals.reduce((a, b) => {
                  return a + b;
                }, 0);
              },
            },
          },
        },
      },
    },
    legend: {
      show: false,
    },
    colors: colorsOfChart,
    tooltip: {
      style: {
        fontSize: "16px",
        fontFamily: "Golos Text",
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          plotOptions: {
            pie: {
              donut: {
                labels: {
                  value: {
                    fontSize: "18px",
                    offsetY: 10,
                  },
                  total: {
                    fontSize: "14px"
                  }
                }
              }
            }
          }
        },
      },
      {
        breakpoint: 390,
        options: {
          plotOptions: {
            pie: {
              donut: {
                labels: {
                  value: {
                    fontSize: "16px",
                    offsetY: 10,
                  },
                  total: {
                    fontSize: "12px"
                  }
                }
              }
            }
          }
        },
      },
      {
        breakpoint: 340,
        options: {
          plotOptions: {
            pie: {
              donut: {
                labels: {
                  value: {
                    fontSize: "15px",
                    offsetY: 6,
                  },
                  total: {
                    fontSize: "10px"
                  }
                }
              }
            }
          }
        },
      },
    ],
    dataLabels: {
      enabled: false,
    },
    labels: [translations.value['main.perfect'], translations.value['main.good'], translations.value['main.not_bad'], translations.value['main.bad']],
  }
});
const pieSeries = [6867, 28674, 1405, 26422];
const pieSeries2 = computed(() => [allStatistics.value.great_count, allStatistics.value.good_count, allStatistics.value.normal_count, allStatistics.value.bad_count]);
const areaChartOptions = computed(() => {
  return {
    chart: {
      animations: {
        enabled: true,
        easing: 'linear',
        speed: 300,
        animateGradually: {
          enabled: true,
          delay: 150
        },
        dynamicAnimation: {
          enabled: true,
          speed: 1000
        },
      },
      toolbar: {
        show: false
      },
      zoom: {
        enabled: false
      },
      type: 'area',
      foreColor: '#1D2825',
      fontFamily: 'Golos Text',
    },
    dataLabels: {
      enabled: false
    },
    fill: {
      type: 'image'
    },
    colors: colorsOfChart,
    responsive: [
      {
        breakpoint: 640,
        options: {
          chart: {
            width: "500px",
          }
        },
      },
    ],
    xaxis: {
      categories: ['2017', '2022', '2023', '2024'],
      // range: 6
    },
    yaxis: {
      labels: {
        formatter: function (val) {
          return val.toLocaleString();
        }
      }
    },
    stroke: {
      curve: 'smooth',
      width: 6
    },
  }
});
const areaSeries = computed(() => [
  {
    name: translations.value['statistics.davlat'],
    data: [689779, 1357326, 1346052, 1396226]
  },
  {
    name: translations.value['statistics.nodavlat'],
    data: [11643, 1349251, 823486, 871068]
  },
  {
    name: translations.value['statistics.xususiy'],
    data: [11643, 69005, 35271, 36399]
  },
  {
    name: translations.value['statistics.dxsh'],
    data: [0, 123386, 126004, 131446]
  },
  {
    name: translations.value['statistics.oilaviy'],
    data: [0, 554035, 662211, 703223]
  }
]);

function percentStatistics(count) {

  return (count * 100 / Object.values(formRating.selectedService ? serviceStatistics.value || 0 : allStatistics.value || 0).reduce((sum, value) => sum + value, 0)).toFixed(2)
}

function statisticsToggle(idx) {
  statistics.value.forEach((statistic, index) => {
    if (index === idx) {
      statistic.active = true;
    } else {
      statistic.active = false;
    }
  });
}

async function submitQuestionAnswer() {
  loading.value = true;
  try {
    let res;
    if (selectedList[currentQuestion.value - 1]) {
      res = await useServices().postServices("/answer", {
        answer_id: selectedList[currentQuestion.value - 1],
      });
    }
    if (res.status === 201) {
      if (currentQuestion.value < data.value?.questionsData.count) {
        currentQuestion.value++;
      }

      if (selectedList.length === data.value?.questionsData.count) {
        disabledAfterAll.value = true;
      }
    }
  } catch {
    console.log("error")
  } finally {
    loading.value = false;
  }
}

async function submitServiceAnswer() {
  loading.value = true;
  try {
    let res;
    if (formRating.selectedService && formRating.ratingService) {
      res = await useServices().postServices("/second_survey/answer", {
        service: formRating.selectedService.value,
        answer: formRating.ratingService - 1,
      });
    }
    if (res.status === 201) {
      formRating.selectedService = "";
      formRating.ratingService = "";
      useStatistic().getAllStatistics('/second_survey/statistic');
    }
  } catch {
    console.log("error")
  } finally {
    loading.value = false;
  }
}
</script>
