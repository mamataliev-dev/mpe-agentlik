<template>
  <div>
    <div class="page-info-block mb-10">
      <p v-html="data.text.header_text" class="text-sm md:text-base">
      </p>
    </div>

    <div v-if="data.activities?.results?.length > 0">
      <!-- Desktop -->
      <ULink
        :to="localePath(`/faoliyat/${route.params.slug}/${data.activities?.results[0]?.slug}`)"
        class="hidden lg:block"
      >
        <div
          class="group p-[2rem] bg-white rounded-br-16 mb-40 hover:text-green"
        >
          <div class="h-[600px] overflow-hidden rounded-lg">
            <img
              :src="data.activities?.results[0]?.image"
              alt=""
              class="w-full h-full rounded-lg object-cover group-hover:scale-110 duration-200"
            />
          </div>

          <div class="flex flex-col gap-y-[1rem] mt-[1rem]">
            <span
              class="font-medium text-green-dark text-lg group-hover:text-green"
              >{{ data.activities?.results[0]?.title }}
            </span>

            <span class="text-[#5D5D5F]">{{ data.activities?.results[0]?.created_at }}</span>
          </div>
        </div>
      </ULink>

      <!-- Mobile -->
      <TheCard
        :link="`/faoliyat/${route.params.slug}/${data.activities?.results[0]?.slug}`"
        :image="data.activities?.results[0]?.image"
        :title="data.activities?.results[0]?.title"
        :date="data.activities?.results[0]?.created_at"
        :views="data.activities?.results[0]?.views"
        :key="data.activities?.results[0]?.id"
        class="lg:hidden mb-4"
      />

      <div class="cards-grid">
        <TheCard
          v-for="item in data.activities.results.slice(1)"
          :link="`/faoliyat/${route.params.slug}/${item.slug}`"
          :image="item.image"
          :title="item.title"
          :date="item.created_at"
          :views="item.views"
          :key="item.id"
        />
      </div>

      <div class="mt-[40px] flex justify-end">
        <ThePagination :items="data.activities.count" @page="updatePage" />
      </div>
    </div>

    <div class="page-info-block mt-10 lg:mt-16 lg:mb-0 mb-4">
      <p v-html="data.text.footer_text" class="text-sm md:text-base">
      </p>
    </div>
  </div>
</template>

<script setup>
import { useActivities } from "~/stores/activities";

const localePath = useLocalePath();
const route = useRoute();
const { data } = await useAsyncData('activitiesSlug', async () => {
  let activities = await useActivities().getActivities('/activities', { category__slug: route.params.slug,  page: route.query?.page || 1});
  let text = await useActivities().getActivities(`/activities/categories/${route.params.slug}`);

  return { activities, text };
});

const emits = defineEmits(["isPostPage"]);

const updatePage = async (page) => {
  data.value.activities = await useActivities().getActivities('/activities', { category__slug: route.params.slug,  page});
  if(process.client) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
};

onMounted(() => {
  emits("isPostPage", false);
});
</script>

<style lang="scss" scoped></style>
