import { defineStore } from "pinia";
import { useAxios } from "@/api/index";

export const useEducation = defineStore("education", () => {
  // Education
  async function getEducation(url, params) {
    try {
      let res = await useAxios().getRequest(url, params);
      return res.data;
    } catch (error) {
      console.log("error", error);
    }
  }
  return {
    getEducation,
  };
});
