import { useUserInfo } from "@/composables/useUserInfo";
import HomeView from "@/views/home-view/HomeView.vue";
import LoginView from "@/views/login-view/LoginView.vue";
import RegisterView from "@/views/register-view/RegisterView.vue";
import { isNil } from "lodash-es";
import { createRouter, createWebHistory } from "vue-router";

export const enum RouteName {
  LOGIN = "LOGIN",
  HOME = "HOME",
}

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/login", name: RouteName.LOGIN, component: LoginView },
    { path: "/register", name: "RegisterView", component: RegisterView },
    { path: "/", redirect: { name: RouteName.HOME } },
    {
      path: "/home",
      name: RouteName.HOME,
      component: HomeView,
      meta: { needLogin: true },
    },
  ],
});

const { userInfo, getUserInfo } = useUserInfo();

router.beforeEach(async (to, from) => {
  if (to.meta.needLogin) {
    if (sessionStorage.accessToken) {
      if (isNil(userInfo.value)) {
        await getUserInfo();
      }
    } else {
      return { name: RouteName.LOGIN, replace: true };
    }
  }
  
  // 登录后就不能再去到登录页
  if (
    to.name === RouteName.LOGIN &&
    sessionStorage.accessToken &&
    to.name !== from.name
  ) {
    return { name: from.name, replace: true };
  }
});
