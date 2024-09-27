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
      <template #optional="{ record }">
        <a-space>
          <a-button type="primary" @click="doUpdate(record)">修改</a-button>
          <a-button status="danger" @click="doDelete(record)">删除</a-button>
        </a-space>
      </template>
    </a-table>
  </div>
</template>
<!-- id=15, title=暴力遍历, content=a+b, tags=["简单","a+b"], answer=a+b,
 submitNum=0, accept/* eslint-disable prettier/prettier */

/* eslint-disable prettier/prettier */
// eslint-disable-next-line prettier/prettier
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

thumbNum=0, favourNum=0, userId=1, createTime=2024-09-19T21:51:51, updateTime=2024-09-19T21:51:51, isDelete=0 -->
<script setup lang="ts">
import { onMounted, ref, watchEffect } from "vue";
import { QuestionControllerService } from "../../../generated/services/QuestionControllerService";
import { Question } from "generated/models/Question";
import { useRouter } from "vue-router";
const show = ref(true);

const dataList = ref([]);
const total = ref(0);

const router = useRouter();

const searchParams = ref({
  current: 1,
  pageSize: 3,
});

const loadData = async () => {
  const resp = await QuestionControllerService.listQuestionByPage(
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
const doUpdate = (question: Question) => {
  console.log("update");
  router.push({
    path: "/update/question",
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
    title: "id",
    dataIndex: "id",
  },
  {
    title: "标题",
    dataIndex: "title",
  },
  {
    title: "内容",
    dataIndex: "content",
  },
  {
    title: "标签",
    dataIndex: "tags",
  },
  {
    title: "提交数",
    dataIndex: "submitNum",
  },
  {
    title: "通过数",
    dataIndex: "acceptedNum",
  },
  // {
  //   title: "答案",
  //   dataIndex: "answer",
  // },
  {
    title: "判题用例",
    dataIndex: "judgeCase",
  },
  {
    title: "判题限制",
    dataIndex: "judgeConfig",
  },
  {
    title: "更新时间",
    dataIndex: "updateTime",
  },
  {
    title: "创建时间",
    dataIndex: "createTime",
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
