import { defineStore } from "pinia";

export const usePage = defineStore("page", () => {
  const title = ref("");
  const isPostPage = ref(false);
  const date = ref("");
  const pageTitle = ref("");

  function setTitle(newTitle) {
    title.value = newTitle;
  }

  function defineIsPostPage(val) {
    isPostPage.value = val;
  }

  function definePageTitle(val) {
    pageTitle.value = val;
  }

  function definePageDate(val) {
    date.value = val;
  }

  watch(
    () => isPostPage.value,
    (newValue, oldValue) => {
      defineIsPostPage(newValue);
    }
  );

  return {
    title,
    pageTitle,
    isPostPage,
    date,
    setTitle,
    defineIsPostPage,
    definePageTitle,
    definePageDate
  };
});
