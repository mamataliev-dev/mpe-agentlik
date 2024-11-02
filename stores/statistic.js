import { defineStore } from "pinia";
import { useAxios } from "@/api/index";

export const useStatistic = defineStore("statistic", () => {
  // Static

  const allStatistics = ref(null);
  const serviceStatistics = ref(null);
  async function getStatistics(url, params) {
    try {
      let res = await useAxios().getRequest(url, params);
      serviceStatistics.value = res.data;
      return res.data;
    } catch (error) {
      console.log(error)
    }
  }
  async function getAllStatistics(url) {
    try {
      let res = await useAxios().getRequest(url);
      allStatistics.value = res.data;
      return res.data;
    } catch (error) {
      console.log(error)
    }
  }
  return {
    getStatistics,
    serviceStatistics,
    getAllStatistics,
    allStatistics
  };
});
