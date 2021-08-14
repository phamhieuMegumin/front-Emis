import axios from "axios";
import { useRouter } from "vue-router";

const router = useRouter();

axios.defaults.baseURL = process.env.VUE_APP_BASE_URL;

axios.interceptors.request.use(
  function(config) {
    // Do something before request is sent
    const token = localStorage.getItem("JWT");
    if (token)
      config.headers = {
        Authorization: `Bearer ${token}`,
      };
    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(undefined, function(error) {
  if (error.response.status === 401) {
    router.push("/login");
    return Promise.reject(error);
  }
});
