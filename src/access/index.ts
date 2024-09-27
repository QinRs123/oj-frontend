/* eslint-disable prettier/prettier */
// eslint-disable-next-line prettier/prettier
import router from "@/router";
import store from "@/store";
import ACCESS_ENUM from "./accessEnum";
import checkAccess from "./checkAccess";


router.beforeEach( async(to, from, next) => {
  console.log("登录用户信息",store.state.user.loginUser);

  const loginUser =store.state.user.loginUser;
  //如果之前没登陆过，自动登录
  if (!loginUser || !loginUser.role) {
    await store.dispatch("user/getLoginUser");
  }
  const needAccess = to.meta?.access as string ?? ACCESS_ENUM.NOT_LOGIN;

  if (needAccess !== ACCESS_ENUM.NOT_LOGIN) {
    if (!loginUser) {
      next("/user/login?redirect=${to.fullPath}");
      return;
    }

    if (!checkAccess(loginUser, needAccess)) {
      next("/noAuth");
      return;
    }
  }
  next();
});