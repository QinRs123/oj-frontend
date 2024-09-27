/* eslint-disable prettier/prettier */
// initial state
import ACCESS_ENUM from "@/access/accessEnum";
import { StoreOptions } from "vuex";
import { UserControllerService } from "../../generated/services/UserControllerService"

export default {
  namespaced: true,
  state: () => ({
    loginUser: {
      userName: "未登录",
    },
  }),
  actions: {
    async getLoginUser({ commit, state }, payload) {
      const res =await UserControllerService.getUser();
      if(res.code === 200 ){
        commit("updateUser", res.data);
      }else{
        commit("updateUser", {...state.loginUser, userRole: ACCESS_ENUM.NOT_LOGIN});
      }
    },
    saveLoginUser({commit, state}, userId) {
      // alert("id   ="+userId);
      commit("updateUser", {...state.loginUser, id: userId});
    }
  },
  mutations: {
    updateUser(state, payload) {
      state.loginUser = payload;
    },
  },
} as StoreOptions<any>;