import { defineStore } from "pinia";
import { useAxios } from "@/api/index";

export const useActivities = defineStore("activities", () => {
  // Activities
  async function getActivities(url, params) {
    try {
      let res = await useAxios().getRequest(url, params);
      return res.data;
    } catch (error) {
      console.log("error", error);
    }
  }
  return {
    getActivities,
  };
});
