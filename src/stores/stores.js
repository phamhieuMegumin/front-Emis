import { createStore } from "vuex";

const store = createStore({
  state: {
    isAuthetication: false,
    userInfo: {
      accountId: "",
      userName: "",
      fullName: null,
      age: null,
      gender: null,
      role: null,
    },
    testTitle: [""],
  },
  mutations: {
    CHANGE_AUTHENTICATION(state, data) {
      state.isAuthetication = true;
      state.userInfo = { ...data };
    },
    LOGOUT_AUTHEN(state) {
      state.isAuthetication = false;
    },
    TEST_CHANGE(state) {
      state.testTitle.push("3");
    },
  },
  actions: {},
});

export default store;
