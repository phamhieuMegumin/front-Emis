<template>
  <div>
    <div class="login-container">
      <div class="form-group" v-loading="store.state.loading">
        <div class="logo">
          <img class="logo-image" src="../../assets/logo_login.084a83c4.svg" />
          <div class="logo-title">EMIS Ôn tập</div>
        </div>
        <div class="container">
          <!-- Bắt đầu tab menu -->
          <div class="menu-tabs">
            <div class="is-active tab">
              <img
                class="tab-icon"
                src="../../assets/icon_teacher_active.0cfd3855.svg"
                width="24"
                height="24"
              /><span class="text">Giáo viên</span>
            </div>
            <div class="tab">
              <img
                class="tab-icon"
                src="../../assets/icon_student.c4ef172f.svg"
                width="24"
                height="24"
              /><span class="text">Học sinh</span>
            </div>
          </div>
          <!-- Kết thúc tab menu -->
          <!-- Bắt đầu form input -->
          <div class="tab-container">
            <!-- Bắt đầu Input userName -->
            <el-form :model="account" :rules="rules">
              <div class="row-input">
                <el-form-item prop="username">
                  <el-input
                    placeholder="Nhập email hoặc số điện thoại"
                    v-model="account.userName"
                  >
                    <template #prefix>
                      <div class="input-prefix-icon">
                        <img
                          src="../../assets/icon_user.eb8ff65a.svg"
                          width="16"
                          height="16"
                        />
                      </div>
                    </template>
                  </el-input>
                </el-form-item>
              </div>
              <div class="row-input">
                <el-form-item prop="password">
                  <el-input
                    placeholder="Nhập mật khẩu"
                    v-model="account.password"
                    type="password"
                  >
                    <template #prefix>
                      <div class="input-prefix-icon">
                        <img
                          src="../../assets/icon_key.1533a911.svg"
                          width="16"
                          height="16"
                        />
                      </div>
                    </template>
                  </el-input>
                </el-form-item>
              </div>
            </el-form>
            <!-- Kết thúc input UserName -->
            <div class="row">
              <el-button @click="handleSubmit" class="btn--gradient btn-100"
                >Đăng nhập</el-button
              >
            </div>
          </div>
          <!-- Kết thúc form input -->
          <!-- Bắt đầu form footer -->
          <div class="form-footer">
            <div class="container">
              <div class="row">
                <router-link to="/"
                  ><span class="text-accent"
                    >Bạn quên mật khẩu?</span
                  ></router-link
                >
              </div>
              <div class="row">
                Bạn chưa có tài khoản?
                <router-link to="/Register">
                  <span class="text-accent">Đăng ký ngay</span>
                </router-link>
              </div>
            </div>
          </div>
          <!-- Kết thúc form footer -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from "vue";
import { onBeforeRouteUpdate } from "vue-router";
import { useStore } from "vuex";
// import Notification from "../../uses/Notification";
import AuthManager from "../../uses/Auth";
export default {
  setup() {
    onBeforeRouteUpdate((vm) => {
      console.log(vm);
    });
    // const { ErrorNotify } = Notification();
    const { handleLogin } = AuthManager();
    const store = useStore();
    // const router = useRouter();
    // Quy chuẩn kiểm tra form
    const rules = reactive({
      userName: [
        {
          required: true,
          message: "Không được để trống",
          trigger: "blur",
        },
      ],
      password: [
        {
          required: true,
          message: "Không được để trống",
          trigger: "blur",
        },
      ],
    });
    /**
     * Thông tin đăng nhập của người dùng
     * CreatedBy : PQHieu(12/07/2021)
     */
    const account = reactive({
      userName: "",
      password: "",
    });
    /**
     * Thực hiện đăng nhập
     * CreatedBy : PQhieu(18/07/2021)
     */
    const handleSubmit = () => {
      handleLogin(account);
    };

    return {
      account,
      handleSubmit,
      rules,
      store,
    };
  },
};
</script>

<style scoped>
/* Logo */
.logo {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 28px;
}
.logo-title {
  font-weight: 700;
  font-size: 24px;
  line-height: 32px;
  color: #4e5b6a;
  padding-left: 8px;
}
/* Kết thúc logo */
/* Menu tab */
.container .menu-tabs {
  margin: 16px 0;
  display: flex;
  width: 100%;
  height: 40px;
  overflow-x: hidden;
  overflow-y: hidden;
}
.container .menu-tabs .tab {
  flex: 1;
  height: 100%;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 500;
  color: #62768e;
  border-bottom: 2px solid #b6b9ce;
}
.container .menu-tabs .tab .text {
  height: 100%;
  padding-left: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.container .menu-tabs .tab.is-active {
  border-bottom: 2px solid #8a6bf6;
}
.container .menu-tabs .tab.is-active .text {
  color: #8a6bf6;
}
/* End of Menu Tab */
</style>
