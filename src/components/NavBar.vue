<template>
  <div class="header-container navBar">
    <!-- Bắt đầu nav link -->
    <div class="nav-link">
      <div class="items-center p-4">
        <router-link to="/">
          <img
            class="cursor-pointer"
            src="../assets/logo_login.084a83c4.svg"
            width="40"
            height="35"
          />
        </router-link>
      </div>
      <div class="nav-link-item">
        <router-link to="/">
          <img src="../assets/ic_chart.728bdf38.svg" />
          <div class="item-text">Tổng quan</div>
        </router-link>
      </div>
      <div class="nav-link-item">
        <router-link to="/teacher/classroom">
          <img src="../assets/ic_home.465f7016.svg" />
          <div class="item-text">Lớp học</div>
        </router-link>
      </div>
      <div class="nav-link-item">
        <router-link to="/">
          <img src="../assets/ic_multi.d199c255.svg" />
          <div class="item-text">Học liệu</div>
        </router-link>
      </div>
    </div>
    <!-- Kết thúc nav link -->
    <!-- Bắt đầu header right -->
    <div class="header-right">
      <div class="help-container">
        <img
          class="help"
          src="../assets/ic_Setting_24.9ebabebf.svg"
          width="24"
          height="24"
        />
      </div>
      <div class="help-container">
        <img
          class="help"
          src="../assets/ic_Help_20.3bfad484.svg"
          width="24"
          height="24"
        />
      </div>
      <div class="notify-container">
        <img
          class="icon"
          src="../assets/ic_Noti_24.fcf6e908.svg"
          width="24"
          height="24"
        /><!---->
      </div>
      <div class="user-container header-user">
        <div class="header-avatar">
          <div class="expand-container">
            <div class="hello-message">
              <span class="hello">Xin chào, </span
              ><span class="full-name">{{
                store.state.userInfo.fullName
              }}</span>
            </div>
            <img class="image" src="../assets/getavatar.png" />
          </div>
        </div>
      </div>
    </div>
    <!-- Kết thúc header right -->
  </div>
</template>

<script>
import { useStore } from "vuex";
export default {
  setup() {
    const store = useStore();
    return {
      store,
    };
  },
};
</script>

<style scoped>
.header-container {
  height: 64px;
  min-height: 64px;
  box-shadow: 0 3px 20px rgb(90 125 141 / 16%);
  z-index: 1;
  position: sticky;
  background: #fff;
  top: 0;
}

.items-center > a {
  display: flex;
  align-items: center;
  padding: 16px;
}
.nav-link {
  height: 100%;
  width: auto;
  display: flex;
  align-items: center;
}
.nav-link-item {
  height: 100%;
}
.nav-link-item > a {
  height: 100%;
  padding: 0 12px;
  margin: 0 12px;
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  color: #62768e;
  text-decoration: none;
}
.nav-link-item img {
  margin-right: 8px;
  filter: grayscale(100%);
}
.item-text {
  font-size: 16px;
}

/* Bắt đàu header right */
.header-right {
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  width: auto;
  display: flex;
  align-items: center;
}
.help-container {
  height: 40px;
  padding: 0 8px;
  display: flex;
  align-items: center;
  cursor: pointer;
}
.notify-container {
  position: sticky;
  right: 79px;
  width: auto;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  padding: 0 8px;
  cursor: pointer;
}
.user-container {
  display: flex;
  height: 100%;
  align-items: center;
  color: #62768e;
}
.header-avatar {
  top: 0;
  right: 0;
  height: 100%;
  width: auto;
  padding-right: 16px;
  display: flex;
  align-items: center;
  cursor: pointer;
}
.header-avatar .expand-container {
  display: flex;
}
.header-avatar .expand-container .hello-message {
  margin: auto 16px auto 8px;
}
.header-avatar .expand-container .hello-message .full-name {
  font-weight: 700;
}
.header-avatar .expand-container .image {
  height: 47px;
  width: 47px;
  background-size: 100%;
  background-repeat: none;
  background-color: #f1f2f7;
  border: 1px solid #f1f2f7;
  border-radius: 50%;
  cursor: pointer;
  overflow: hidden;
}
/* Kết thúc header right */
/* Css link */
a.router-link-active {
  border-bottom: 2px solid #8a6bf6;
}
a.router-link-active .item-text {
  color: #8a6bf6;
  font-weight: 700;
}
a.router-link-active img {
  filter: grayscale(0);
}
</style>
