import { defineStore } from "pinia";
import { useAxios } from "@/api/index";

export const useAgency = defineStore("agency", () => {
  // Agentlik
  async function getAgency(url) {
    try {
      let res = await useAxios().getRequest(url);
      return res.data;
    } catch (error) {
      console.log("error", error);
    }
  }
  return {
    getAgency,
  };
});
