<script setup lang="ts">
import MdEditor from "@/components/MdEditor.vue";
import { onMounted, reactive, ref } from "vue";
import { QuestionControllerService } from "../../../generated/services/QuestionControllerService";
import { useRoute, useRouter } from "vue-router";

const form = ref({
  answer: "",
  content: "",
  judgeCase: [
    {
      input: "",
      output: "",
    },
  ],
  judgeConfig: {
    timeLimit: 1000,
    memoryLimit: 1000,
    stackLimit: 1000,
  },
  tags: [],
  title: "",
});
const route = useRoute();
const loadData = async () => {
  const id = route.query.id;
  const resp = await QuestionControllerService.questionGetById(id as any);
  if (resp.code === 200) {
    console.log(resp);
    form.value = resp.data as any;
  } else {
    alert(resp.data);
  }
};

onMounted(() => {
  loadData();
});

const handleAdd = () => {
  form.value.judgeCase.push({
    output: "",
    input: "",
  });
};
const handleDelete = (index: number) => {
  form.value.judgeCase.splice(index, 1);
};

const router = useRouter();
const doSubmit = async () => {
  console.log(form);
  const resp = await QuestionControllerService.questionUpdate(form.value);
  console.log(resp);
  if (resp.code === 200) {
    alert("update success...");
    router.push("/manage/question");
  } else {
    alert("update error");
  }
};

const onContentChange = (v: string) => {
  form.value.content = v;
};
const onAnswerChange = (v: string) => {
  form.value.answer = v;
};
</script>

<template>
  <div id="addQuestionView">
    <div>
      <h2>创建题目</h2>
    </div>
    <a-form-item field="title" label="标题">
      <a-input v-model="form.title" placeholder="请输入标题"></a-input>
    </a-form-item>
    <a-form-item field="tags" label="标签">
      <a-input-tag v-model="form.tags" placeholder="请选择标签"></a-input-tag>
    </a-form-item>
    <a-form :model="form" label-align="left">
      <a-form-item field="content" label="题目内容">
        <MdEditor :value="form.content" :handle-change="onContentChange" />
      </a-form-item>
      <a-form-item field="answer" label="答案">
        <MdEditor :value="form.answer" :handle-change="onAnswerChange" />
      </a-form-item>
      <a-form-item label="判题配置" :content-flex="false" :merge-props="false">
        <a-space direction="vertical" style="min-width: 480px">
          <a-form-item field="judgeConfig.timeLimit" label="时间限制">
            <a-input-number
              v-model="form.judgeConfig.timeLimit"
              placeholder="请输入时间限制"
              mode="button"
              size="large"
            />
          </a-form-item>
          <a-form-item field="judgeConfig.memoryLimit" label="空间限制">
            <a-input-number
              v-model="form.judgeConfig.memoryLimit"
              placeholder="请输入空间限制"
              mode="button"
              size="large"
            />
          </a-form-item>
          <a-form-item field="judgeConfig.stackLimit" label="堆栈限制">
            <a-input-number
              v-model="form.judgeConfig.stackLimit"
              placeholder="请输入堆栈限制"
              mode="button"
              size="large"
            />
          </a-form-item>
        </a-space>
      </a-form-item>

      <a-form-item label="用例配置" :content-flex="false" :merge-props="false">
        <a-form-item
          v-for="(judgeCaseItem, index) of form.judgeCase"
          :field="`form.judgeCase[${index}].input`"
          :key="index"
          no-style
        >
          <a-space direction="vertical" style="min-width: 480px">
            <a-form-item
              :field="`form.judgeCase[${index}].input`"
              :label="`输入用例-${index}`"
              :key="index"
            >
              <a-input
                v-model="judgeCaseItem.input"
                placeholder="请输入测试输入案例"
              />
            </a-form-item>
            <a-form-item
              :field="`form.judgeCase[${index}].output`"
              :label="`输出用例-${index}`"
              :key="index"
            >
              <a-input
                v-model="judgeCaseItem.output"
                placeholder="请输入测试输出案例"
              />
            </a-form-item>
            <a-button status="danger" @click="handleDelete(index)"
              >删除测试用例</a-button
            >
          </a-space>
        </a-form-item>

        <div>
          <a-button @click="handleAdd">新增测试输入输出案例</a-button>
        </div>
      </a-form-item>
      <a-form-item>
        <a-button @click="doSubmit">提交</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>
<style scoped></style>
<!-- {
    "answer": "cout<<a+b;",
    "content": "a+b",
    "judgeCase": {
      "input": "1,5",
      "output": "6"
    },
    "judgeConfig": {
      "timeLimit": 1000,
      "memoryLimit": 1000,
      "stackLimit": 1000
    },
    "tags": ["A+B"],
    "title": "A+B",
    "userId": 1
  } -->
