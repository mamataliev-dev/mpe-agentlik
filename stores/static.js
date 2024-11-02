import { defineStore } from "pinia";
import { useAxios } from "@/api/index";

export const useStatic = defineStore("static", () => {
  // Static

  const staticData = ref(null);
  async function getStatic(url, params) {
    try {
      let res = await useAxios().getRequest(url, params);
      staticData.value = res.data;
      return res.data;
    } catch (error) {
      console.log(error)
    }
  }
  return {
    getStatic,
    staticData
  };
});
