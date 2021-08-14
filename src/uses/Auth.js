import axios from "axios";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

export default function() {
  const store = useStore();
  const router = useRouter();
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
      const data = await axios({
        method: "post",
        url: "accounts/login",
        data: account,
      });
      localStorage.setItem("JWT", data.data.token);
      store.commit("CHANGE_AUTHENTICATION", data.data.userInfo);
      router.push("/teacher/classroom");
    } catch (error) {
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
      await axios({
        method: "post",
        url: "accounts/register",
        data: account,
      });
      router.push("/login");
    } catch (error) {
      console.log(error);
    }
  };
  return {
    checkAuthenticaiton,
    handleLogin,
    handleRegister,
  };
}
