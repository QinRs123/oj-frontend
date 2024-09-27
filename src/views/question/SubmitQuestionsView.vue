<!-- eslint-disable vue/no-useless-template-attributes -->
<template>
  <div id="MenageQuestionView">
    <a-table
      :columns="columns"
      :data="dataList"
      :pagination="{
        showTotal: true,
        pageSize: searchParams.pageSize,
        current: searchParams.current,
        total: total,
      }"
      @page-change="onPageChange"
    >
      <template #createTime="{ record }">{{ record.createTime }}</template>
      <template #judgeInfo="{ record }" style="max-width: 50px">{{
        record.judgeInfo
      }}</template>
      <template #optional="{ record }">
        <a-space>
          <a-button type="primary" @click="doQuestion(record)">未开发</a-button>
        </a-space>
      </template>
    </a-table>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watchEffect } from "vue";
import { QuestionControllerService } from "../../../generated/services/QuestionControllerService";
import { Question } from "generated/models/Question";
import { useRouter } from "vue-router";
import { QuestionSubmitRequest } from "generated/models/QuestionSubmitRequest";
import { QuestionSubmitControllerService } from "../../../generated/services/QuestionSubmitControllerService";
import { Message } from "@arco-design/web-vue";
const show = ref(true);

const dataList = ref([]);
const total = ref(0);

const router = useRouter();

const searchParams = ref<QuestionSubmitRequest>({
  current: 1,
  pageSize: 3,
});

const onSearch = async () => {
  const resp =
    await QuestionSubmitControllerService.listQuestionSubmitByPageTest(
      searchParams.value
    );
  console.log(resp);
  if (resp.code === 200) {
    dataList.value = resp.data?.records as any;
    total.value = resp.data?.total as any;
  } else {
    alert("加载失败");
  }
};

const loadData = async () => {
  const resp =
    await QuestionSubmitControllerService.listQuestionSubmitByPageTest(
      searchParams.value
    );
  console.log(resp);
  if (resp.code === 200) {
    dataList.value = resp.data?.records as any;
    total.value = resp.data?.total as any;
  } else {
    // alert("加载失败");
  }
};

onMounted(() => {
  loadData();
});

watchEffect(() => {
  loadData();
});

const doDelete = (question: Question) => {
  console.log(question);
  const id = question.id;
  QuestionControllerService.deleteById(id as any);
  loadData();
};
const doQuestion = (question: Question) => {
  alert("未开发");
};

const onPageChange = (page: number) => {
  searchParams.value = {
    ...searchParams.value,
    current: page,
  };
  loadData();
};

const columns = [
  {
    title: "题号",
    dataIndex: "id",
  },
  {
    title: "用户id",
    dataIndex: "userId",
  },
  {
    title: "语言",
    dataIndex: "language",
  },
  {
    title: "题号",
    dataIndex: "questionId",
  },
  {
    title: "题目状态",
    dataIndex: "status",
  },
  {
    title: "执行详情",
    slotName: "judgeInfo",
  },
  {
    title: "创建时间",
    slotName: "createTime",
  },
  {
    title: "Optional",
    slotName: "optional",
  },
];
</script>

<style scoped>
.custom-filter {
  padding: 20px;
  background: var(--color-bg-5);
  border: 1px solid var(--color-neutral-3);
  border-radius: var(--border-radius-medium);
  box-shadow: 0 2px 5px rgb(0 0 0 / 10%);
}

.custom-filter-footer {
  display: flex;
  justify-content: space-between;
}
</style>
