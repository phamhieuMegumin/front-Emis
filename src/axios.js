import axios from "axios";
import { useRouter } from "vue-router";
import Notification from "./uses/Notification";
const router = useRouter();
const { errorNotify } = Notification();
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
    errorNotify();
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(undefined, function(error) {
  errorNotify("Có lỗi xảy ra, vui lòng thử lại sau");
  if (error.response.status === 401) {
    console.log("Tài khoản hoặc mật khẩu sai");
    router.push("/login");
    return Promise.reject(error);
  }
  return Promise.reject(error);
});
