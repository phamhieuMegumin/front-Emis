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
    classroomList: [],
    gradeList: [],
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
    CHANGE_CLASSROOM_LIST(state, data) {
      state.classroomList = [...data];
    },
    CHANGE_GRADE_LIST(state, data) {
      state.gradeList = [...data];
    },
  },
  actions: {},
});

export default store;
