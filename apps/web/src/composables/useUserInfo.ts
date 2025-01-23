import { authApi } from "@/api";
import { UserItem } from "@/api/auth.api";
import { ref } from "vue";

const userInfo = ref<UserItem | null>(null);

export const useUserInfo = () => {
  const getUserInfo = async () => {
    userInfo.value = (await authApi.me()) || null;
    return userInfo.value;
  };

  return {
    getUserInfo,
    userInfo,
  };
};
