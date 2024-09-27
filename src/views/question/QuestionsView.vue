<template>
  <div id="MenageQuestionView">
    <a-space direction="vertical" size="large" layout="inline">
      <a-form :model="searchParams" layout="inline">
        <a-form-item field="title" label="标题">
          <a-input v-model="searchParams.title" />
        </a-form-item>
        <a-form-item field="tags" label="标签" style="min-width: 400px">
          <a-input-tag v-model="searchParams.tags"></a-input-tag>
        </a-form-item>
        <a-form-item>
          <a-button @click="onSearch">搜索</a-button>
        </a-form-item>
      </a-form>
    </a-space>
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
      <template #tags="{ record }">
        <a-space wrap>
          <a-tag
            v-for="(tag, index) of record.tags"
            :key="index"
            color="green"
            bordered
            >{{ tag }}</a-tag
          >
        </a-space>
      </template>
      <template #acceptedRate="{ record }">{{
        record.submitNum === 0
          ? 0
          : record.acceptedNum / record.submitNum +
            "%(" +
            record.acceptedNum +
            "/" +
            record.submitNum +
            ")"
      }}</template>
      <template #createTime="{ record }">{{ record.createTime }}</template>
      <template #optional="{ record }">
        <a-space>
          <a-button type="primary" @click="doQuestion(record)">做题</a-button>
          <!-- <a-button status="danger" @click="doDelete(record)">删除</a-button> -->
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
import { QuestionRequest } from "generated/models/QuestionRequest";
const show = ref(true);

const dataList = ref([]);
const total = ref(0);

const router = useRouter();

const searchParams = ref<QuestionRequest>({
  title: "",
  tags: [],
  current: 1,
  pageSize: 3,
});

const onSearch = async () => {
  const resp = await QuestionControllerService.listQuestionVoByPage(
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
  const resp = await QuestionControllerService.listQuestionVoByPage(
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
  console.log("doQuestion");
  router.push({
    path: "/do/question",
    query: {
      id: question.id,
    },
  });
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
    title: "标题",
    dataIndex: "title",
  },
  {
    title: "标签",
    slotName: "tags",
  },
  // {
  //   title: "提交数",
  //   dataIndex: "submitNum",
  // },
  {
    title: "通过率",
    slotName: "acceptedRate",
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
