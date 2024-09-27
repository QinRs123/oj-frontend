<template>
  <div class="home">
    <MdEditor :value="MdValue" :handle-change="MdOnChange" />
    <CodeEditor :value="CeValue" :handle-change="CeOnChange" />
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import HelloWorld from "@/components/HelloWorld.vue";
import MdEditor from "@/components/MdEditor.vue";
import CodeEditor from "@/components/CodeEditor.vue";

const CeValue = ref();
const CeOnChange = (v: string) => {
  CeValue.value = v;
  console.log(CeValue.value);
};

const MdValue = ref();
const MdOnChange = (v: string) => {
  MdValue.value = v;
  console.log(MdValue.value);
};
</script>
