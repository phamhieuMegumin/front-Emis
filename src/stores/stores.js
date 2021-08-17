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
    classroomList: [],
    gradeList: [],
    subjectList: [],
    classroomInfo: null,
    loading: false,
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
    CHANGE_SUBJECT_LIST(state, data) {
      state.subjectList = [...data];
    },
    CHANGE_CLASSROOM_INFO(state, data) {
      state.classroomInfo = { ...data };
    },
    CHANGE_LOADING(state) {
      state.loading = !state.loading;
    },
  },
  actions: {},
});

export default store;
