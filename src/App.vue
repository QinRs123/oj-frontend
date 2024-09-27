<!-- eslint-disable no-undef -->
<!-- eslint-disable no-irregular-whitespace -->
<!-- eslint-disable prettier/prettier -->
<script setup="ts">
import BasicLayout from "./layouts/BasicLayout.vue";
import { onMounted } from "vue";
import { useRoute } from "vue-router";

/**
 * 全局初始化
 */

const doInit = () => {
  console.log(`   　┏┓　 ┏┓+ +
  　┏┛┻━━━┛┻┓ + +
  　┃　　　　　　　┃
  　┃　　　━　　　┃ ++ + + +
   ████━████ ┃+
  　┃　　　　　　　┃ +
  　┃　　　┻　　　┃
  　┃　　　　　　　┃ + +
  　┗━┓　　　┏━┛
  　　　┃　　　┃
  　　　┃　　　┃ + + + +
  　　　┃　　　┃
  　　　┃　　　┃ +  神兽保佑
  　　　┃　　　┃    代码无bug
  　　　┃　　　┃　　+
  　　　┃　 　　┗━━━┓ + +
 　　　┃ 　　　　　　　┣┓
  　　　┃ 　　　　　　　┏┛
  　　　┗┓┓┏━┳┓┏┛ + + + +
  　　　　┃┫┫　┃┫┫
  　　　　┗┻┛　┗┻┛+ + + +`);
};

const route = useRoute();

onMounted(() => {
  doInit();
});
</script>

<template>
  <div id="app">
    <template v-if="route.path.startsWith('/user')">
      <router-view />
    </template>
    <template v-else>
      <BasicLayout />
    </template>
  </div>
</template>

<style>
#app {
}
</style>
