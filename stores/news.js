import { defineStore } from "pinia";
import { useAxios } from "@/api/index";

export const useNews = defineStore("news", () => {
  // News
  async function getNews(url, params) {
    try {
      let res = await useAxios().getRequest(url, params);
      return res.data;
    } catch (error) {
      console.log(error)
    }
  }
  return {
    getNews,
  };
});
