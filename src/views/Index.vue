<template>
  <el-card class="introduce">
    <div class="order">
      <el-card
        v-for="(card, index) in state.cardList"
        :key="index"
        class="order-item"
      >
        <template #header>
          <div class="card-header">
            <span>{{ card.title }}</span>
          </div>
        </template>
        <div class="item">{{ card.count }}</div>
      </el-card>
    </div>
    <div id="zoom" ref="zoom"></div>
  </el-card>
</template>

<script lang="ts" setup>
import * as echarts from 'echarts';
import { onMounted, reactive, ref } from 'vue';
import { zoomOptios } from '@/options';

const zoom = ref<HTMLDivElement | null>(null);

interface ICard {
  title: string;
  count: string | number;
}

interface IIndexType {
  cardList: ICard[];
}

const state = reactive<IIndexType>({
  cardList: [
    { title: '今日订单数', count: 1888 },
    { title: '今日日活', count: 36271 },
    { title: '转化率', count: '20%' },
  ],
});

onMounted(() => {
  const myChart = echarts.init(zoom.value!);
  myChart.setOption(zoomOptios);
});
</script>

<style lang="scss" scoped>
.introduce {
  .order {
    display: flex;
    margin-bottom: 50px;
    .order-item {
      flex: 1;
      margin-right: 20px;
      &:last-child {
        margin-right: 0;
      }
    }
  }
  #zoom {
    min-height: 300px;
  }
}
</style>
