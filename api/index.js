export function useAxios() {
  const { $axios } = useNuxtApp();

  async function getRequest(url, params) {
    try {
      let res = await $axios.get(url, { params });
      return res;
    } catch (error) {
      throw showError({
        statusCode: error.response.status || 404,
        fatal: true,
        message: error.message || "Error",
      })
    }
  }

  async function postRequest(url, body) {
    let res = await $axios.post(url,  body);
    return res;
  }

  return {
    getRequest,
    postRequest
  };
}