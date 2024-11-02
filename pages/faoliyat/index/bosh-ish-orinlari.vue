<template>
  <div>
    <UModal v-model="activeJobModal" :ui="{
      width: 'sm:max-w-[1264px]',
      shadow: 'shadow-none',
      rounded: 'rounded-2xl',
    }">
      <UCard :ui="{
      ring: '',
      divide: 'divide-y divide-gray-100 dark:divide-gray-800',
      rounded: 'rounded-2xl',
    }">
        <template #header>
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <h3 class="text-xl md:text-2xl font-semibold leading-6 dark:text-white">
                {{ vacancy.title }}
              </h3>
              <UButton color="gray" variant="soft" size="lg" :ui="{ rounded: 'rounded-full' }"
                icon="i-heroicons-x-mark-20-solid" class="-my-1" @click="activeJobModal = false" />
            </div>
            <div class="flex gap-4 flex-col sm:flex-row sm:items-center justify-between px-1">
              <div class="space-x-2 sm:space-x-4">
                <UButton color="gray" variant="soft" size="xl"
                  :label="translations['vacancy.share']"
                  :ui="{ color: { gray: { soft: 'bg-white-111 ring-1 ring-white-222' } } }" trailing-icon="i-heroicons-paper-airplane"
                  @click="activeJobModal = false" />
                <UButton color="gray" variant="soft" size="xl"
                  :label="translations['vacancy.print']"
                  :ui="{ color: { gray: { soft: 'bg-white-111 ring-1 ring-white-222' } } }" trailing-icon="i-heroicons-printer"
                  @click="activeJobModal = false" />
              </div>
              <div class="flex order-first sm:order-last items-center gap-2">
                <span>{{ vacancy.views }}</span>
                <UIcon name="i-heroicons-eye" class="text-xl text-grey-0" />
              </div>
            </div>
          </div>
        </template>
        <div class="mt-6">
          <div v-html="vacancy.text" class="text-base text-black overflow-hidden">
          </div>
        </div>
        <div class="text-end mt-10">
          <UButton size="xl" :label="translations['vacancy.send_resume']" @click="activeJobModal = false" :ui="{
      rounded: 'rounded-xl',
      padding: { xl: 'px-8 sm:px-14 py-4' },
      color: { green: { solid: 'shadow-none' } },
    }" trailing-icon="i-heroicons-paper-airplane" variant="solid" />
        </div>
      </UCard>
    </UModal>
    <div class="page-info-block mb-10">
      <p class="text-sm md:text-base"> 
        {{ translations['activity.vacancies_header_text'] }}
      </p>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
      <div @click="modalVacancy(result)" v-for="result in data?.results" :key="result.id" class="p-4 md:p-8 group cursor-pointer bg-white rounded-2xl">
        <h4 class="text-lg font-medium group-hover:text-green duration-200">
          {{ result.title }}
        </h4>
        <p class="flex items-center justify-between text-grey-0 text-sm mt-8">
          <span>{{ translations['vacancy.accepted_time'] }}:</span><span class="shrink-0">{{ result.created_at }}</span>
        </p>
      </div>
    </div>

    <div v-if="data.count > 20" class="mt-[40px] flex justify-end">
      <ThePagination :items="data.count" @page="updatePage" />
    </div>

    <div class="page-info-block mt-10 lg:mt-16 lg:mb-0 mb-4">
      <p class="text-sm md:text-base">
        {{ translations['activity.vacancies_footer_text'] }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { usePage } from "~/stores/page";
import { useActivities } from "~/stores/activities";
import { useTranslation } from '~/stores/translations';

const { translations } = storeToRefs(useTranslation());
const { data } = await useAsyncData('activitiesVacancy', () => useActivities().getActivities('/vacansy'));

const page = usePage();
const activeJobModal = ref(false);
useHead({
  title: () => `MPE.UZ | ${translations.value["header.vacancies"]}`,
});

const emits = defineEmits(["isPostPage"]);

const updatePage = async (page) => {
  data.value = await useActivities().getActivities('/vacansy', { page });
  if(process.client) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
};

onMounted(() => {
  emits("isPostPage", false);
  page.setTitle(translations.value["header.vacancies"]);
});

const vacancy = ref(null);
const modalVacancy = (result) => {
  vacancy.value = result;
  activeJobModal.value = true;
};
</script>

<style lang="scss" scoped></style>
