<template>
  <el-card class="swiper-container">
    <div class="header">
      <el-button
        type="primary"
        size="small"
        icon="el-icon-plus"
        @click="handleAdd"
        >增加</el-button
      >
      <el-popconfirm
        cancelButtonText="取消"
        confirmButtonText="确定"
        title="确定删除吗？"
        @confirm="handleDelete"
      >
        <template #reference>
          <el-button type="danger" size="small" icon="el-icon-delete"
            >批量删除</el-button
          >
        </template>
      </el-popconfirm>
    </div>
  </el-card>
  <DialogAddSwiper ref="addSwiper" :reload="getCarousels" :type="state.type" />
  <el-card class="swiper-container">
    <el-table
      :data="state.tableData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column label="轮播图" width="200">
        <template #default="scope">
          <img
            style="width: 150px; height: 150px"
            :src="scope.row.carouselUrl"
            alt="轮播图"
          />
        </template>
      </el-table-column>
      <el-table-column label="跳转链接">
        <template #default="scope">
          <a target="_blank" :href="scope.row.redirectUrl">{{
            scope.row.redirectUrl
          }}</a>
        </template>
      </el-table-column>
      <el-table-column prop="carouselRank" label="排序值" width="120">
      </el-table-column>
      <el-table-column prop="createTime" label="添加时间" width="200">
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="state.total"
      :page-size="state.pageSize"
      :current-page="state.currentPage"
      @current-change="changePage"
    />
  </el-card>
</template>

<script lang="ts" setup>
import { ElMessage } from 'element-plus';
import { onMounted, reactive, ref } from 'vue';
import { fetchCarousels, deleteCarousels } from '@/api/service/carousels';
import DialogAddSwiper from '@/components/DialogAddSwiper.vue';

interface ICarousel {
  carouselId: number;
  carouselRank: number;
  carouselUrl: string;
  createTime: string;
  createUser: number;
  isDeleted: number;
  redirectUrl: string;
  updateTime: string;
  updateUser: number;
}

interface IState {
  loading: boolean;
  tableData: ICarousel[];
  currentPage: number;
  pageSize: number;
  type: 'add' | 'edit';
  multipleSelection: ICarousel[];
  total: number;
}

const state = reactive<IState>({
  loading: false, // 控制加载动画
  tableData: [], // 数据列表
  currentPage: 1, // 当前页数
  pageSize: 10, // 每页请求数
  type: 'add', // 操作类型
  multipleSelection: [], // 选中项
  total: 0, // 总条数
});
const addSwiper = ref<any>(null);

onMounted(() => {
  getCarousels();
});
// 获取轮播图列表
const getCarousels = async () => {
  state.loading = true;
  const res = await fetchCarousels(state.currentPage, state.pageSize);
  state.currentPage = res.data.currPage;
  state.total = res.data.totalCount;
  state.tableData = res.data.list;
  state.loading = false;
};

// 添加轮播项
const handleAdd = () => {
  state.type = 'add';
  addSwiper.value?.open();
};

// 选中之后的change方法，一旦选项有变化，就会触发该方法。
const handleSelectionChange = (val: ICarousel[]) => {
  state.multipleSelection = val;
};
// 批量删除
const handleDelete = async () => {
  if (!state.multipleSelection.length) {
    ElMessage.error('请选择项');
    return;
  }
  await deleteCarousels(state.multipleSelection.map((i) => i.carouselId));
  ElMessage.success('删除成功');
  getCarousels();
};

const changePage = (val: number) => {
  state.currentPage = val;
  getCarousels();
};
</script>
