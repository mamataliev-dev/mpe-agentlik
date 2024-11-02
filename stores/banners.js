import { defineStore } from "pinia";
import { useAxios } from "@/api/index";

export const useBanners = defineStore("banners", () => {
  // Banners
  async function getBanners(url) {
    try {
      let res = await useAxios().getRequest(url);
      return res.data;
    } catch (error) {
      console.log("error", error);
    }
  }
  return {
    getBanners,
  };
});
