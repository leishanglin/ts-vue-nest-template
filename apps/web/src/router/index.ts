import { useUserInfo } from "@/composables";
import HomeView from "@/views/home-view/HomeView.vue";
import LoginView from "@/views/login-view/LoginView.vue";
import RegisterView from "@/views/register-view/RegisterView.vue";
import { isNil } from "lodash-es";
import { createRouter, createWebHistory } from "vue-router";

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/login", name: "LoginView", component: LoginView },
    { path: "/register", name: "RegisterView", component: RegisterView },
    { path: "/", redirect: "/home" },
    {
      path: "/home",
      name: "HomeView",
      component: HomeView,
      meta: { needLogin: true },
    },
  ],
});

const { userInfo, getUserInfo } = useUserInfo();
router.beforeEach(async (to) => {
  if (to.meta.needLogin) {
    if (sessionStorage.accessToken) {
      if (isNil(userInfo.value)) {
        await getUserInfo();
      }
    } else {
      return { name: "LoginView", replace: true };
    }
  }
});
