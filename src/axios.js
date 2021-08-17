import axios from "axios";
import { useRouter } from "vue-router";
import Notification from "./uses/Notification";
import store from "./stores/stores";
const router = useRouter();
const { errorNotify } = Notification();
axios.defaults.baseURL = process.env.VUE_APP_BASE_URL;

axios.interceptors.request.use(
  function(config) {
    // Do something before request is sent
    const token = localStorage.getItem("JWT");
    store.commit("CHANGE_LOADING");
    if (token)
      config.headers = {
        Authorization: `Bearer ${token}`,
      };
    return config;
  },
  function(error) {
    // Do something with request error
    store.commit("CHANGE_LOADING");
    errorNotify();
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    store.commit("CHANGE_LOADING");
    return response;
  },
  function(error) {
    store.commit("CHANGE_LOADING");
    errorNotify("Có lỗi xảy ra, vui lòng thử lại sau");
    if (error.response.status === 401) {
      console.log("Tài khoản hoặc mật khẩu sai");
      router.push("/login");
      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);
