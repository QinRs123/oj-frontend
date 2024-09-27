<template>
  <div>
    <a-row :gutter="[24, 24]">
      <a-col :md="12">
        <a-tabs default-active-key="1">
          <a-tab-pane key="1" title="题目详情">
            <Card v-if="question.content">
              <EdView :value="question.content" />
            </Card>
          </a-tab-pane>
          <a-tab-pane key="2" title="题解">
            <EdView :value="question.answer" />
          </a-tab-pane>
        </a-tabs>
      </a-col>
      <a-col :md="12">
        <a-space direction="vertical" size="large" layout="inline">
          <a-select
            v-model="questionSubmit.language"
            :style="{ width: '320px' }"
            placeholder="编程语言"
          >
            <a-option>java</a-option>
          </a-select>
        </a-space>
        <CodeEditor
          :value="questionSubmit.code"
          :handle-change="CodeOnChange"
          :language="questionSubmit.language"
        />
        <a-button type="primary" @click="SubmitQuestion">提交代码</a-button>
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { QuestionControllerService } from "../../../generated/services/QuestionControllerService";
import { useRoute, useRouter } from "vue-router";
import CodeEditor from "@/components/CodeEditor.vue";
import { QuestionVo } from "generated/models/QuestionVo";
import EdView from "./EdView.vue";
import { Card } from "@arco-design/web-vue";
import { QuestionSubmitControllerService } from "../../../generated/services/QuestionSubmitControllerService";
import { QuestionSubmitRequest } from "generated/models/QuestionSubmitRequest";
import { useStore } from "vuex";

const CodeValue = ref();

const question = ref<QuestionVo>({});

const store = useStore();

const loginUser = store.state.user.loginUser;

const route = useRoute();
const loadData = async () => {
  const id = route.query.id;
  const resp = await QuestionControllerService.questionGetById(id as any);
  if (resp.code === 200) {
    console.log(resp);
    question.value = resp.data as any;
  } else {
    alert(resp.data);
  }
};

const questionSubmit = ref<QuestionSubmitRequest>({
  questionId: route.query.id as any,
  code: "",
  language: "",
  userId: loginUser.id as any,
});

const CodeOnChange = (v: string) => {
  questionSubmit.value.code = v;
  console.log(questionSubmit.value.code);
};
const router = useRouter();
const SubmitQuestion = async () => {
  console.log(questionSubmit.value);
  const resp = await QuestionSubmitControllerService.questionSubmitAdd(
    questionSubmit.value
  );
  if (resp.code === 200) {
    alert("success..");
    router.push("/watch/questionSubmit");
  } else {
    alert(resp.msg);
  }
};

onMounted(() => {
  loadData();
});

function newFunction(): string {
  return "CeValue";
}
</script>

<style scoped></style>
