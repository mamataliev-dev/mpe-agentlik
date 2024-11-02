import { defineStore } from "pinia";
import { useAxios } from "@/api/index";

export const useServices = defineStore("services", () => {
  // Services
  const interactive_services = ref(null);
  async function getServices(url, params) {
    try {
      let res = await useAxios().getRequest(url, params);
      if(res.config.url === "/interactive_services") {
        interactive_services.value = res.data;
      }
      return res.data;
    } catch (error) {
      console.log("error", error);
    }
  }

  async function postServices(url, body) {
    try {
      let res = await useAxios().postRequest(url, body);
      return res;
    } catch (error) {
      console.log("error", error);
    }
  }
  return {
    getServices,
    postServices,
    interactive_services
  };
});
