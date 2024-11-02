import axios from 'axios';

export default defineNuxtPlugin((nuxtApp) => {
  const axiosInstance = axios.create({
    baseURL: nuxtApp.$config.public.API_BASE_URL || 'https://admin.agentlik.ndc-agency.uz/api',
  });

  axiosInstance.interceptors.request.use((config) => {
    config.headers['Language'] = nuxtApp.$i18n.locale.value;
    return config;
  }, (error) => {
    return Promise.reject(error);
  });

  axiosInstance.interceptors.response.use((response) => {
    return response;
  }, (error) => {
    return Promise.reject(error);
  });
  nuxtApp.provide('axios', axiosInstance);
});