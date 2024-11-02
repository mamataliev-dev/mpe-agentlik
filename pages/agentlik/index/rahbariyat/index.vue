<template>
  <div>
    <div class="page-info-block mb-10">
      <p class="text-[14px] md:text-[16px]">
        {{ translations['agency.leadership_header_text'] }}
      </p>
    </div>

    <div>
      <!-- Mobile -->
      <ULink :to="localePath(`/agentlik/rahbariyat/${data?.results[0].slug}`)" class="lg:hidden">
        <div class="group bg-white rounded-br-16 flex flex-col">
          <div class="flex flex-col gap-y-6 lg:gap-y-[27px] px-4 py-6">
            <div class="flex flex-col gap-y-[14px]">
              <span v-html="data?.results[0].short_text" class="lg:w-[458px] subtitle">
              </span>
              <h1 class="agentlik-title">{{data?.results[0].title}}</h1>
            </div>

            <div class="flex flex-col gap-y-[13px]">
              <div class="flex items-center gap-x-[13px]">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4.99935 6.66667L8.15035 8.76733C9.27001 9.51378 10.7287 9.51378 11.8483 8.76733L14.9993 6.66667M4.99935 17.5H14.9993C16.8403 17.5 18.3327 16.0076 18.3327 14.1667V5.83333C18.3327 3.99238 16.8403 2.5 14.9993 2.5L4.99935 2.5C3.1584 2.5 1.66602 3.99238 1.66602 5.83333L1.66602 14.1667C1.66602 16.0076 3.1584 17.5 4.99935 17.5Z"
                    stroke="#1D2825"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <span class="text-[14px] text-green-dark">{{data?.results[0].email}}</span>
              </div>

              <div class="flex items-center gap-x-[13px]">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M17.5 15.8333V14.4617C17.5 13.7802 17.0851 13.1674 16.4523 12.9143L14.7572 12.2362C13.9524 11.9143 13.0352 12.263 12.6475 13.0383L12.5 13.3333C12.5 13.3333 10.4167 12.9167 8.75 11.25C7.08333 9.58333 6.66667 7.5 6.66667 7.5L6.96168 7.35249C7.73698 6.96484 8.08571 6.04761 7.76379 5.2428L7.08574 3.54768C6.83263 2.91492 6.21979 2.5 5.53828 2.5H4.16667C3.24619 2.5 2.5 3.24619 2.5 4.16667C2.5 11.5305 8.46954 17.5 15.8333 17.5C16.7538 17.5 17.5 16.7538 17.5 15.8333Z"
                    stroke="#1D2825"
                    stroke-width="1.5"
                    stroke-linejoin="round"
                  />
                </svg>
                <span class="text-[14px] text-green-dark"
                  >{{data?.results[0].phone_number}}</span
                >
              </div>

              <div class="flex items-center gap-x-[13px]">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2.5 7.50033L2.5 15.0003C2.5 16.8413 3.99238 18.3337 5.83333 18.3337H14.1667C16.0076 18.3337 17.5 16.8413 17.5 15.0003V7.50033M2.5 7.50033V6.25033C2.5 4.40938 3.99238 2.91699 5.83333 2.91699L14.1667 2.91699C16.0076 2.91699 17.5 4.40938 17.5 6.25033V7.50033M2.5 7.50033L17.5 7.50033M13.3333 1.66699V4.16699M6.66667 1.66699V4.16699"
                    stroke="#1D2825"
                    stroke-width="1.5"
                    stroke-linecap="round"
                  />
                </svg>
                <span class="text-[14px] text-green-dark"
                  >{{ data?.results[0].work_time }}</span
                >
              </div>
            </div>
          </div>

          <div class="p-4">
            <img
              class="w-full h-full object-cover"
              :src="data?.results[0].image"
              alt=""
            />
          </div>
        </div>
      </ULink>

      <!-- Desktop -->
      <ULink :to="localePath(`/agentlik/rahbariyat/${data?.results[0].slug}`)" class="hidden lg:block">
        <div
          class="group min-h-[350px] bg-white overflow-hidden rounded-br-16 flex justify-between relative"
        >
          <div
            class="order-2 w-2/5 relative before:absolute before:h-full before:w-1/2 before:top-0 before:left-0 before:bg-gradient-to-r before:from-[rgba(255,255,255,1)] before:to-[rgba(255,255,255,0)]"
          >
            <img
              class="w-full h-full object-cover"
              :src="data?.results[0].image"
              alt=""
            />
          </div>

          <div class="flex flex-col gap-y-[27px] px-[32px] py-[58px]">
            <div class="flex flex-col gap-y-[14px]">
              <span v-html="data?.results[0].short_text" class="w-[458px] text-[#5D5D5F]"
                ></span
              >
              <h1
                class="text-green-dark font-medium text-[2rem] group-hover:text-green duration-200"
              >
                {{ data?.results[0].title }}
              </h1>
            </div>

            <div class="flex flex-col gap-y-[13px]">
              <div class="flex items-center gap-x-[13px]">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4.99935 6.66667L8.15035 8.76733C9.27001 9.51378 10.7287 9.51378 11.8483 8.76733L14.9993 6.66667M4.99935 17.5H14.9993C16.8403 17.5 18.3327 16.0076 18.3327 14.1667V5.83333C18.3327 3.99238 16.8403 2.5 14.9993 2.5L4.99935 2.5C3.1584 2.5 1.66602 3.99238 1.66602 5.83333L1.66602 14.1667C1.66602 16.0076 3.1584 17.5 4.99935 17.5Z"
                    stroke="#1D2825"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <span class="text-[14px] text-green-dark">{{ data?.results[0].email }}</span>
              </div>

              <div class="flex items-center gap-x-[13px]">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M17.5 15.8333V14.4617C17.5 13.7802 17.0851 13.1674 16.4523 12.9143L14.7572 12.2362C13.9524 11.9143 13.0352 12.263 12.6475 13.0383L12.5 13.3333C12.5 13.3333 10.4167 12.9167 8.75 11.25C7.08333 9.58333 6.66667 7.5 6.66667 7.5L6.96168 7.35249C7.73698 6.96484 8.08571 6.04761 7.76379 5.2428L7.08574 3.54768C6.83263 2.91492 6.21979 2.5 5.53828 2.5H4.16667C3.24619 2.5 2.5 3.24619 2.5 4.16667C2.5 11.5305 8.46954 17.5 15.8333 17.5C16.7538 17.5 17.5 16.7538 17.5 15.8333Z"
                    stroke="#1D2825"
                    stroke-width="1.5"
                    stroke-linejoin="round"
                  />
                </svg>
                <span class="text-[14px] text-green-dark"
                  >{{ data?.results[0].phone_number }}</span
                >
              </div>

              <div class="flex items-center gap-x-[13px]">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2.5 7.50033L2.5 15.0003C2.5 16.8413 3.99238 18.3337 5.83333 18.3337H14.1667C16.0076 18.3337 17.5 16.8413 17.5 15.0003V7.50033M2.5 7.50033V6.25033C2.5 4.40938 3.99238 2.91699 5.83333 2.91699L14.1667 2.91699C16.0076 2.91699 17.5 4.40938 17.5 6.25033V7.50033M2.5 7.50033L17.5 7.50033M13.3333 1.66699V4.16699M6.66667 1.66699V4.16699"
                    stroke="#1D2825"
                    stroke-width="1.5"
                    stroke-linecap="round"
                  />
                </svg>
                <span class="text-[14px] text-green-dark"
                  >{{ data?.results[0].work_time }}</span
                >
              </div>
            </div>
          </div>
        </div>
      </ULink>

      <div
        class="flex flex-col gap-y-4 lg:gap-y-6 bg-white rounded-br-16 p-4 md:p-8 mt-4"
      >
        <div class="flex flex-col gap-y-3">
          <span class="subtitle"
            >{{ translations['numbers.subtitle'] }}</span
          >

          <h3 class="text-[1rem] lg:text-[1.5rem] text-green-dark font-medium">
            {{ translations['numbers.title'] }}:
          </h3>
        </div>

        <div>
          <div
          v-for="(number, idx) in numbersOfAgency"
          :key="idx"
            class="flex items-start sm:items-center flex-col gap-y-2 sm:flex-row justify-between gap-x-4 border border-b-0 last-of-type:border-b border-white-222 px-4 py-[12px] first-of-type:rounded-t-br-16 last-of-type:rounded-b-br-16"
          >
            <span class="subtitle-sm"
              >{{ number.title }}</span
            >
            <span class="shrink-0 text-xs sm:text-sm md:text-base text-green font-semibold">{{ number.numbers }}</span>
          </div>
        </div>
      </div>

      <div class="flex flex-col gap-y-4 lg:gap-y-6 mt-10 lg:mt-16">
        <h2 class="agentlik-title">{{ translations['header.leadership'] }}</h2>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <AgentlikCard
            v-for="result in data?.results"
            :data="result"
            :key="result.id"
            @click="$router.push(localePath(`/agentlik/rahbariyat/${result.slug}`))"
          />
        </div>
      </div>
      <div v-if="data.count > 20" class="mt-[40px] flex justify-end">
        <ThePagination :items="data.count" @page="updatePage" />
      </div>
    </div>

    <div class="page-info-block mt-10 lg:mt-16 lg:mb-0 mb-4">
      <p class="text-[14px] md:text-[16px]">
        {{ translations['agency.leadership_footer_text'] }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { usePage } from "~/stores/page";
import { useAgency } from "~/stores/agency";
import { useTranslation } from '~/stores/translations';

const { translations } = storeToRefs(useTranslation());
const { data } = await useAsyncData('leadership', () => useAgency().getAgency('/leadership'));
const localePath = useLocalePath();

useHead({
  title: () => `MPE.UZ | ${translations.value['header.leadership']}`,
});

const page = usePage();
const emits = defineEmits(["isPostPage"]);
const numbersOfAgency = computed(() => [
  { title: translations.value['numbers.one'], numbers: '801, 804, 802, 806' },
  { title: translations.value['numbers.two'], numbers: '823, 831, 832, 833, 892' },
  { title: translations.value['numbers.three'], numbers: '826, 716' },
  { title: translations.value['numbers.four'], numbers: '840, 842' },
  { title: translations.value['numbers.five'], numbers: '878, 877, 876, 873' },
  { title: translations.value['numbers.six'], numbers: '700, 706, 708, 713, 714, 704, 711' },
  { title: translations.value['numbers.seven'], numbers: '858, 860, 859, 856, 725, 861' },
  { title: translations.value['numbers.eight'], numbers: '818, 853' },
  { title: translations.value['numbers.nine'], numbers: '812, 814, 815, 813' },
  { title: translations.value['numbers.ten'], numbers: '727, 726, 728, 819' },
  { title: translations.value['numbers.eleven'], numbers: '850, 820, 854, 825, 855, 827' },
  { title: translations.value['numbers.twelve'], numbers: '705, 824' },
  { title: translations.value['numbers.thirteen'], numbers: '720, 722, 723, 724' },
  { title: translations.value['numbers.fourteen'], numbers: '834, 835, 836, 837' },
  { title: translations.value['numbers.fiveteen'], numbers: '890, 895, 830, 817, 719, 852, 896' },
  { title: translations.value['numbers.sixteen'], numbers: '870, 869, 847' },
  { title: translations.value['numbers.seventeen'], numbers: '808, 848, 816, 894, 809' },
  { title: translations.value['numbers.eighteen'], numbers: '898, 880, 881' },
  { title: translations.value['numbers.nineteen'], numbers: '868, 867, 865, 866, 864' },
  { title: translations.value['numbers.twenty'], numbers: '822, 102, 133, 122' },
])

const updatePage = async (page) => {
  data.value = await useAgency().getAgency('/leadership', { page });
  if(process.client) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
};

onMounted(() => {
  emits("isPostPage", false);
  page.setTitle(translations.value['header.leadership']);
});
</script>

<style lang="scss" scoped></style>
