import { defineStore } from "pinia";
import { useAxios } from "@/api/index";

export const useAdvertisment = defineStore("advertisment", () => {
  // Advertisment
  async function getAd(url) {
    try {
      let res = await useAxios().getRequest(url);
      return res.data;
    } catch (error) {
      console.log("error", error);
    }
  }
  return {
    getAd,
  };
});
