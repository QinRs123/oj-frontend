<template>
  <div class="userLogin">
    <a-form :model="form" :style="{ width: '600px' }" @submit="handleSubmit">
      <a-form-item field="userAccount" label="账号">
        <a-input v-model="form.userAccount" placeholder="请输入账号" />
      </a-form-item>
      <a-form-item field="userPassword" label="密码">
        <a-input-password
          v-model="form.userPassword"
          placeholder="请输入密码"
        />
      </a-form-item>
      <a-form-item field="isRead">
        <a-checkbox v-model="form.isRead"> I have read the manual </a-checkbox>
      </a-form-item>
      <a-form-item>
        <a-button html-type="submit">提交</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import message from "@arco-design/web-vue/es/message";
import { UserControllerService } from "../../../generated/services/UserControllerService";
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const router = useRouter();
const store = useStore();
const form = reactive({
  userAccount: "",
  userPassword: "",
  isRead: false,
});

/**
 * @param data 提交表单信息
 */
const handleSubmit = async () => {
  const res = await UserControllerService.userLogin(form);
  if (res.code === 200) {
    alert("登录成功" + JSON.stringify(res.data));
    store.dispatch("user/saveLoginUser", res.data?.id);
    router.push({
      path: "/",
      replace: true,
    });
  } else {
    message.error("登录失败" + res.data);
  }
};
</script>
