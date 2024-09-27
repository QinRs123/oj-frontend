<!-- eslint-disable prettier/prettier -->
<!-- eslint-disable vue/valid-template-root menu-item-click -->
<template>
    <a-row class="globalHeader" align="center" :wrap="false">
    <a-col flex="auto">
      <div>
        <a-menu
     mode="horizontal"
     :selected-keys="selectedKeys"
     :default-selected-keys="['1']" @menu-item-click="doMenuClick">
      <a-menu-item
        key="0"
        :style="{ padding: 0, marginRight: '38px' }"
        disabled
      >
        <div calss="title-bar">
          <img class="logo" src="../assets/logo.png" />
        </div>
      </a-menu-item>
      <a-menu-item v-for="itme in visiableRouter" :key="itme.path">
        {{ itme.name }}
      </a-menu-item>
    </a-menu>
      </div>
    </a-col>
    <a-col flex="100px">
      <div>
        {{ store.state.user?.loginUser?.userName ?? "***" }}
      </div>
    </a-col>
  </a-row>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { routes } from "../router/routes";
import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";
import checkAccess from "@/access/checkAccess";
import ACCESS_ENUM from "@/access/accessEnum";
const route = useRoute();
const router = useRouter();
const store = useStore();
const loginUser = store.state.user.loginUser;

const visiableRouter = computed(() => {
  return routes.filter((item, index) => {
    if (item.meta?.hideInMenu) {
      return false;
    }
    //todo: 根据权限过滤
    if (
      !checkAccess(store.state.user.loginUser, item?.meta?.access as string)
    ) {
      return false;
    }
    return true;
  });
});
console.log(store.state.user.loginUser);
//默认变量
const selectedKeys = ref(["/"]);
//更新路由后，同步更菜单栏的高亮状态
router.afterEach((to, from, failure) => {
  selectedKeys.value = [to.path];
});
const doMenuClick = (key: string) => {
  router.push({
    path: key,
  });
};
/**
 * npm i @bytemd/vue-next
npm i @bytemd/plugin-highlight @bytemd/plugin-gfm

 */
// setTimeout(() => {
//   store.dispatch("user/getLoginUser", {
//     userName: "qrs",
//     userRole: ACCESS_ENUM.ADMIN,
//   });
// }, 5000);
</script>

<style scoped>
.title-bar {
}

.logo {
  height: 48px;
}
</style>
