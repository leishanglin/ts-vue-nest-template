<script setup lang="ts">
import { SvgIcon } from "@/components/svg-icon";
import { Button, Tooltip } from "ant-design-vue";
import { useLogout } from "./useLogout";

const logout = useLogout();
</script>

<template>
  <div class="page-wrapper">
    <header class="page-header">
      <img class="logo" src="@/assets/images/logo.png" alt="logo" />
      <h1 class="app-title">Todo List</h1>
      <div class="right-wrapper">
        <Tooltip title="退出" placement="left">
          <Button type="text" @click="logout.logout">
            <template #icon>
              <SvgIcon type="log-out"></SvgIcon>
            </template>
          </Button>
        </Tooltip>
      </div>
    </header>
    <main class="page-main">Hello</main>
  </div>
</template>

<style scoped lang="less">
@headerHeight: 56px;

.page-wrapper {
  min-height: 100%;
  padding-top: @headerHeight;
  background-color: #f5f5f5;
  .page-header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: @headerHeight;
    backdrop-filter: blur(8px);
    background-color: rgba(255, 255, 255, 0.6);
    border-bottom: 1px solid rgba(5, 5, 5, 0.06);
    z-index: 10;
    padding: 0 20px;
    display: flex;
    align-items: center;
    gap: 16px;
    .logo {
      width: 28px;
      height: 28px;
      border-radius: 6px;
    }
    .app-title {
      margin-bottom: 0;
      font-weight: 600;
      font-size: 18px;
    }
    .right-wrapper {
      flex: 1;
      width: 0;
      display: flex;
      justify-content: flex-end;
      align-items: center;
    }
  }
  .page-main {
    max-width: 1000px;
    margin: 0 auto;
    padding: 36px;
  }
}
</style>
