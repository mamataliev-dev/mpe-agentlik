import { defineStore } from "pinia";
import { useAxios } from "@/api/index";

export const useSearch = defineStore("search", () => {
  // Search
  const enlargedSearch = ref([]);
  if(process.client) {
    localStorage.getItem("enlargedSearch") ? enlargedSearch.value = JSON.parse(localStorage.getItem("enlargedSearch")) : enlargedSearch.value = [];
  }
  async function getSearch(url, params) {
    try {
      let res = await useAxios().getRequest(url, params);
      return res.data;
    } catch (error) {
      console.log("error", error);
    }
  }
  return {
    getSearch,
    enlargedSearch
  };
});
