<template>
  <div>
    <TheHeader />
    <slot></slot>
    <TheFooter />
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

watch(locale, async() => {
  await useTranslation().getTranslation('/translations');
});
</script>
