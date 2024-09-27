<template>
  <div class="about">
    <h1>Sorry, you need to login or register</h1>
    <a-space>
      <a-button type="primary" @click="login">跳转至登录</a-button>
      <a-button type="primary" @click="register">跳转至注册</a-button>
    </a-space>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const login = () => {
  router.push({
    path: "/user/login",
    replace: true,
  });
};
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const register = () => {
  router.push({
    path: "/user/register",
    replace: true,
  });
};
</script>
