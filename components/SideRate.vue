<template>
  <div class="bg-white rounded-br-12">
    <div class="p-4 lg:p-6 border-b border-borderColor">
      <span class="text-[12px] lg:text-base text-grey">{{ translations['main.questioner'] }}</span>
      <h2 class="font-medium text-[16px] lg:text-[20px] text-green-dark">
        {{ translations['sideRate.rate_website'] }}
      </h2>
    </div>
    <div class="p-6 min-h-40 duration-300">
      <transition name="fade" mode="out-in">
        <div v-if="!submitted" class="flex flex-col gap-y-6">
          <div class="space-y-6">
            <URadio v-for="method of methods" :key="method.value" v-model="selected" v-bind="method" :ui="{
              color: 'text-green',
              border: 'border border-[#C2C2C3]',
              ring: 'focus-visible:ring-2 focus-visible:ring-green dark:focus-visible:ring-green focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-gray-900',
              label: 'text-green-dark cursor-pointer',
            }" />
          </div>
          <UButton :disabled="!selected" :loading="loading" block variant="solid"
            class="shadow-none text-center rounded-br-8 bg-green hover:bg-[#4ADFAE] py-4 font-semibold text-base transition-all duration-200 ease-in-out"
            :ui="{ variant: { solid: 'text-white' } }" :label="translations['main.rate']" @click="submitAnswer" />
        </div>
        <div v-else class="flex flex-col gap-2 items-center justify-center">
          <UIcon class="text-green text-6xl" name="i-heroicons-check-circle"></UIcon>
          <p class="text-grey-dark text-base md:text-xl font-medium text-center">
            {{ translations['sideRate.thanks']}}
          </p>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { useServices } from "~/stores/services";
import { useTranslation } from '~/stores/translations';

const { translations } = storeToRefs(useTranslation());

const submitted = ref(false);
const loading = ref(false);
const selected = ref(null);
const methods = computed(() => [
  { value: 1, label: translations.value['main.perfect'] },
  { value: 2, label: translations.value['main.good'] },
  { value: 3, label: translations.value['main.not_bad'] },
  { value: 4, label: translations.value['main.bad'] },
]);

onMounted(() => {
  if (localStorage.getItem("ratingSubmitted") && localStorage.getItem("ratingSubmitted") != "false") {
    submitted.value = true;
  }
});

async function submitAnswer() {
  loading.value = true;
  try {
    let res;
    if (selected.value) {
      res = await useServices().postServices("/third_survey/answer", {
        answer: selected.value - 1,
      });
    }
    if (res.status === 201) {
      localStorage.setItem("ratingSubmitted", true);
      submitted.value = true;
    }
  } catch {
    console.log("error")
  } finally {
    loading.value = false;
  }
}
</script>

<style lang="scss" scoped></style>
