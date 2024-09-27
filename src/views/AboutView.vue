<template>
  <div class="about">
    <h1>这是一个简易oj网站</h1>
    <p>目前只提供java语言以及少量题目进行作答</p>
    <p>获取输入的方式只有读取args[]数组</p>
    <p>编码格式固定</p>
    {{ code.javaCode }}
  </div>
</template>

<script setup lang="ts">
import MdEditor from "@/components/MdEditor.vue";
import { ref } from "vue";

// eslint-disable-next-line no-undef
const code = ref({
  javaCode: `
public class Main {
    public static void main(String[] args) {
        int a = Integer.parseInt(args[0]);
        int b = Integer.parseInt(args[1]);
        System.out.println(a + b);
    }
}`,
});
</script>
