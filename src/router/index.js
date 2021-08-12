import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/pages/Home.vue";
import Login from "../views/pages/Login.vue";
import Register from "../views/pages/Register.vue";
import store from "../stores/stores";
import AuthContext from "../uses/Auth";
import Teacher from "../views/teacher/Teacher.vue";
import Classroom from "../views/teacher/Classroom.vue";
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
const { checkAuthenticaiton } = AuthContext();
router.beforeEach(async (to, from, next) => {
  // await checkAuthenticaiton();
  if (to.meta.isAuthetication && !store.state.isAuthetication) {
    next("/login");
  } else {
    next();
  }
});
router.afterEach(async () => {
  await checkAuthenticaiton();
});
export default router;
