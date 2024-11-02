import { defineStore } from "pinia";
import { useAxios } from "@/api/index";

export const useDocuments = defineStore("documents", () => {
  // Documents
  async function getDocuments(url, params) {
    try {
      let res = await useAxios().getRequest(url, params);
      return res.data;
    } catch (error) {
      console.log("error", error);
    }
  }
  return {
    getDocuments,
  };
});
