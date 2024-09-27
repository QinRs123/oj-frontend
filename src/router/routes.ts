/* eslint-disable prettier/prettier */
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";
import AdminView from "../views/AdminView.vue";
import NoAuthView from "@/views/NoAuthView.vue";
import ACCESS_ENUM from "@/access/accessEnum";
import UserLayout from "@/layouts/UserLayout.vue";
import UserLoginView from "@/views/user/UserLoginView.vue";
import UserRegisterView from "@/views/user/UserRegisterView.vue";
import MdEditor from "@/components/MdEditor.vue";
import AddQuestionView from "@/views/question/AddQuestionView.vue";
import MenageQuestionView from "@/views/question/MenageQuestionView.vue";
import UpdateQuestionView from "@/views/question/UpdateQuestionView.vue";
import QuestionsView from "@/views/question/QuestionsView.vue";
import DoQuestionView from "@/views/question/DoQuestionView.vue";
import SubmitQuestionsView from "@/views/question/SubmitQuestionsView.vue";


export const routes: Array<RouteRecordRaw> = [
  {
    path: "/about",
    name: "关于网站",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/user",
    name: "用户",
    component: UserLayout,
    meta: {
      hideInMenu: true,
    },
    children: [
      {
        path: "/user/login",
        name: "用户登录",
        component: UserLoginView,
      },
      {
        path: "/user/register",
        name: "用户注册",
        component: UserRegisterView,
      },
    ],
  },
  {
    path: "/",
    name: "浏览题目",
    component: QuestionsView,
  },
  {
    path: "/add/question",
    name: "添加题目",
    component: AddQuestionView,
    meta: {
      access: ACCESS_ENUM.ADMIN,
    },
  },
  {
    path: "/update/question",
    name: "修改题目",
    component: UpdateQuestionView,
    meta: {
      hideInMenu: true,
      meta: {
        access: ACCESS_ENUM.ADMIN,
      },
    },
  },
  {
    path: "/do/question",
    name: "答题",
    component: DoQuestionView,
    meta: {
      hideInMenu: true,
      access: ACCESS_ENUM.USER,
    },
  },
  {
    path: "/manage/question",
    name: "管理题目",
    component: MenageQuestionView,
    meta: {
      access: ACCESS_ENUM.ADMIN,
    },
  },
  {
    path: "/watch/questionSubmit",
    name: "查看提交",
    component: SubmitQuestionsView,
    // meta: {
    //   access: ACCESS_ENUM.ADMIN,
    // },
  },
  {
    path: "/test",
    name: "编辑测试",
    component: HomeView,
    meta: {
      hideInMenu: true,
    },
  },
  // {
  //   path: "/MdEditor",
  //   name: "Md编辑器",
  //   component: MdEditor,
  // },
  {
    path: "/noAuth",
    name: "NoAuthView",
    component: NoAuthView,
    meta: {
      hideInMenu: true,
    },
  },
  {
    path: "/admin",
    name: "管理员",
    component: AdminView,
    meta: {
      access: ACCESS_ENUM.ADMIN,
    },
  },
];
