import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/pages/Home.vue";
import Login from "../views/pages/Login.vue";
import Register from "../views/pages/Register.vue";
import Teacher from "../views/teacher/Teacher.vue";
import Classroom from "../views/teacher/Classroom.vue";
import Test from "../views/pages/Test.vue";
const routes = [
  {
    path: "/",
    redirect: "/login",
    component: Home,
  },
  {
    path: "/login",
    component: Login,
    meta: {
      isAuthetication: false,
    },
  },
  {
    path: "/register",
    component: Register,
    meta: {
      isAuthetication: false,
    },
  },
  {
    path: "/test",
    component: Test,
    meta: {
      isAuthetication: false,
    },
  },
  {
    path: "/teacher/classroom",
    components: {
      default: Teacher,
      classRoom: Classroom,
    },
    meta: {
      isAuthetication: true,
    },
  },
];
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
// const { checkAuthenticaiton } = AuthContext();
router.beforeEach(async (to, from, next) => {
  // await checkAuthenticaiton();
  if (
    to.meta.isAuthetication &&
    !localStorage.getItem("JWT") &&
    to.name != "login" &&
    to.name != "register"
  ) {
    next("/login");
  } else {
    next();
  }
});
// router.afterEach(async () => {
//   await checkAuthenticaiton();
// });
export default router;
