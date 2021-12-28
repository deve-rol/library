import { getCurrentInstance } from "vue";

export default (data) => {
  const Api = getCurrentInstance().appContext.config.globalProperties.Api;
  return Api.Get(data);
};
