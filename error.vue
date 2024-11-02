<template>
  <div>
    <NuxtLayout>
      <div :class="error.statusCode === 404 ? 'bg-[url(/assets/images/404.svg)]' : 'bg-[url(/assets/images/505.svg)]'"
        class="h-[calc(100vh-100px)] flex-grow flex items-center justify-center bg-contain md:bg-auto bg-no-repeat bg-center">
        <div class="w-full h-full flex flex-col items-center justify-center">
          <div class="flex flex-col items-center justify-center gap-y-2">
            <h1 class="text-2xl text-center sm:text-[2rem] text-green-dark">{{ error.statusCode === 404 ?
              translations['error.not_found'] : translations['error.server_error'] }}</h1>
            <span class="text-center  max-w-[70%] sm:max-w-full text-black font-medium text-sm sm:text-base">
              {{ error.statusCode === 404 ? translations['error.page_not_found'] :
                translations['error.page_server_error']
              }} <br />
              {{ translations['error.return_back'] }}
            </span>
          </div>

          <ULink :to="localePath('/')"
            class="flex items-center gap-x-[12px] mt-6 sm:mt-10 py-3 px-4 sm:px-6 bg-green rounded-xl text-white duration-200 hover:bg-green-400">
            <span class="text-sm sm:text-base">{{ translations['error.main_page'] }}</span>
            <i class="i-heroicons-arrow-long-right"></i>
          </ULink>
        </div>
      </div>
    </NuxtLayout>
  </div>
</template>

<script setup>
import { useStatic } from '~/stores/static';
import { useServices } from "~/stores/services";
import { useTranslation } from '~/stores/translations';
useAsyncData('translation', () => useTranslation().getTranslation('/translations'));
useAsyncData('static', () => useStatic().getStatic('/static_infos'));
useAsyncData('interactive_services', () => useServices().getServices('/interactive_services'));
const { locale } = useI18n();

watch(locale, async () => {
  await useTranslation().getTranslation('/translations');
});

const { translations } = storeToRefs(useTranslation());

useHead({
  title: () => `MPE.UZ | ${translations.value['error.not_found']}`,
});

const localePath = useLocalePath();

const props = defineProps({
  error: {
    type: Object,
  },
});

if (process.client) {
  window.scrollTo(0, 0);
}


</script>
