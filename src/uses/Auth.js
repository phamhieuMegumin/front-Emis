import axios from "axios";
import { useRouter } from "vue-router";
import NotificationContext from "../uses/Notification";
import store from "../stores/stores";
export default function() {
  const router = useRouter();
  const { successNotify } = NotificationContext();
  /**
   * Kiểm tra tình trạng login của người dùng
   * CreatedBy : PQhieu(18/07/2021)
   */
  const checkAuthenticaiton = async () => {
    try {
      const data = await axios.get("accounts/authentication");
      if (store) store.commit("CHANGE_AUTHENTICATION", data.data);
    } catch (error) {
      console.log(error);
    }
  };
  /**
   * Thực hiện việc đăng nhập
   * @param="account" : tài khoản, mật khẩu của người dùng
   * CreatedBy : PQhieu(18/07/2021)
   */
  const handleLogin = async (account) => {
    try {
      store.commit("CHANGE_LOADING");
      const data = await axios({
        method: "post",
        url: "accounts/login",
        data: account,
      });
      store.commit("CHANGE_LOADING");
      localStorage.setItem("JWT", data.data.token);
      store.commit("CHANGE_AUTHENTICATION", data.data.accountInfo);
      router.push("/teacher/classroom");
    } catch (error) {
      store.commit("CHANGE_LOADING");
      console.log(error);
    }
  };
  /**
   * Thực hiện việc đăng ký
   * @param="account" : tài khoản, mật khẩu của người dùng
   * CreatedBy : PQhieu(18/07/2021)
   */
  const handleRegister = async (account) => {
    try {
      store.commit("CHANGE_LOADING");
      await axios({
        method: "post",
        url: "accounts/register",
        data: account,
      });
      store.commit("CHANGE_LOADING");
      successNotify("Tài khoản đã đăng ký thành công");
      router.push("/login");
    } catch (error) {
      store.commit("CHANGE_LOADING");
      console.log(error);
    }
  };
  return {
    checkAuthenticaiton,
    handleLogin,
    handleRegister,
  };
}
