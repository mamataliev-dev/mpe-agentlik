import { defineStore } from "pinia";
import { useAxios } from "@/api/index";

export const useHeader = defineStore("header", () => {
  // Header
  async function getHeader(url) {
    try {
      let res = await useAxios().getRequest(url);
      return res.data;
    } catch (error) {
      console.log("error", error);
    }
  }
  return {
    getHeader,
  };
});
