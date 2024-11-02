import { defineStore } from "pinia";
import { useAxios } from "@/api/index";

export const useTranslation = defineStore("translation", () => {
  // Translations

  const translations = ref({});
  async function getTranslation(url, params) {
    try {
      let res = await useAxios().getRequest(url, params);
      translations.value = {...res.data};
      return res.data;
    } catch (error) {
      console.log(error)
    }
  }
  return {
    getTranslation,
    translations
  };
});
