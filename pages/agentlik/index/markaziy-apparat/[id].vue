<template>
  <div>
    <div class="page-info-block mb-10">
      <p class="text-[14px] md:text-[16px]">
        {{ translations['agency.apparatus_header_text'] }}
      </p>
    </div>

    <!-- Mobile -->
    <div class="lg:hidden bg-white rounded-br-16 flex flex-col">
      <div class="flex flex-col gap-y-6 lg:gap-y-[27px] px-4 py-6">
        <div class="flex flex-col gap-y-[14px]">
          <span v-html="data?.short_text" class="lg:w-[458px] subtitle">
          </span>
          <h1 class="agentlik-title">{{ data.title }}</h1>
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
            <span class="text-[14px] text-green-dark">{{ data.email }}</span>
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
              >{{ data.phone_number }}</span
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
              >{{ data.work_time }}</span
            >
          </div>
        </div>
      </div>

      <div class="p-4">
        <img
          class="w-full h-full object-cover"
          :src="data.image"
          alt=""
        />
      </div>
    </div>

    <!-- Desktop -->
    <div
      class="hidden lg:flex min-h-[350px] bg-white overflow-hidden rounded-br-16 justify-between relative"
    >
      <div
        class="order-2 w-2/5 relative before:absolute before:h-full before:w-1/2 before:top-0 before:left-0 before:bg-gradient-to-r before:from-[rgba(255,255,255,1)] before:to-[rgba(255,255,255,0)]"
      >
        <img
          class="w-full h-full object-cover"
          :src="data.image"
          alt=""
        />
      </div>

      <div class="flex flex-col gap-y-[27px] px-[32px] py-[58px]">
        <div class="flex flex-col gap-y-[14px]">
          <span class="w-[458px] text-[#5D5D5F]" v-html="data.short_text"
            ></span
          >
          <h1
            class="text-green-dark font-medium text-[2rem] group-hover:text-green duration-200"
          >
            {{ data.title }}
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
            <span class="text-[14px] text-green-dark">{{ data.email }}</span>
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
              >{{ data.phone_number }}</span
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
              >{{ data.work_time }}</span
            >
          </div>
        </div>
      </div>
    </div>

    <div class="bg-white rounded-br-16 p-4 lg:p-8 mt-4">
      <h2 class="text-[18px] lg:text-[24px] text-green-dark font-medium mb-6">
        {{ translations['agency.biography'] }}
      </h2>

      <div class="flex flex-col gap-y-4">
        <div class="text-[14px] lg:text-[16px] leading-[180%]" v-html="data?.text">
        </div>

        <!-- <div class="flex flex-col gap-y-[8px]">
          <div
            v-for="item in 6"
            class="flex items-start lg:items-center gap-x-[8px]"
          >
            <div
              class="shrink-0 w-[8px] h-[8px] rounded-full bg-green mt-[5px] lg:mt-0"
            ></div>

            <span class="subtitle"
              >2005-2006-yillarda – Sariosiyo tumani 52-umumiy oʻrta taʼlim
              maktabi oʻqituvchisi;</span
            >
          </div>
        </div> -->
      </div>
    </div>

    <div class="page-info-block mt-10 lg:mt-16 lg:mb-0 mb-4">
      <p class="text-[14px] md:text-[16px]">
        {{ translations['agency.apparatus_footer_text'] }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { usePage } from "~/stores/page";
import { useAgency } from "~/stores/agency";
import { useTranslation } from '~/stores/translations';

const { translations } = storeToRefs(useTranslation());
const route = useRoute();
const { data } = await useAsyncData('centralAppratusId', () => useAgency().getAgency(`/central_apparatus/${route.params.id}`));

const page = usePage();
const emits = defineEmits(["isPostPage"]);

useHead({
  title: `MPE.UZ | ${data?.value?.title}`,
});

onMounted(() => {
  emits("isPostPage", false);
  page.setTitle(translations.value['header.central_apparatus']);
  page.definePageTitle(data?.value?.title);
});
</script>

<style lang="scss" scoped></style>
