<template>
  <div class="header">
    <div class="left">
      <span class="title">{{ name }}</span>
    </div>
    <div class="right">右</div>
  </div>
</template>

<script lang="ts">
import { reactive, toRefs } from 'vue';
import {
  RouteLocationNormalized,
  RouteRecordName,
  useRouter,
} from 'vue-router';
export default {
  name: 'Header',
  setup() {
    const router = useRouter();
    const pathMap: Record<RouteRecordName, string> = {
      index: '首页',
      add: '添加商品',
    };
    const state = reactive({
      name: '首页',
    });
    router.afterEach((to: RouteLocationNormalized) => {
      const { id } = to.query;
      if (to.name) {
        state.name = pathMap[to.name];
      }
    });
    return {
      ...toRefs(state),
    };
  },
};
</script>

<style lang="scss" scoped>
.header {
  height: 50px;
  border-bottom: 1px solid #e9e9e9;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  .title {
    font-size: 20px;
  }
}
</style>
